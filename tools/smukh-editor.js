/* ============================================================
   smukh-editor.js  —  in-place TEXT editor, activated by adding
   "#edit" to any page's address (no bookmark needed).

   How it works for the owner:
     1. Go to a page and add  #edit  to the URL  (…/index.html#edit)
     2. Type the passphrase.
     3. Editable text gets a dashed yellow outline — click and type.
     4. Click "Save" — it writes the change straight into the matching
        .html file in your repo folder (File System Access API), then
        you `git push`.  (Firefox/Safari: it downloads the file instead.)

   Only elements marked  data-ed="..."  are editable, and only their
   inner text is written back — surrounding code is never touched.

   Security note: on static hosting a real password is impossible, so
   the passphrase is only a light gate. The real protection is that
   Saving needs YOUR computer's repo folder and YOUR push.
   ============================================================ */
(function () {
  if (window.__smukhEd) { window.__smukhEd.sync(); return; }

  /* >>> change this to your own secret phrase <<< */
  var PASS = 'smukh-edit';

  var CSS =
    '.sed-editable{outline:2px dashed #f5b700!important;outline-offset:3px;cursor:text}' +
    '.sed-editable:hover{background:rgba(245,183,0,.08)}' +
    '.sed-editable:focus{outline:2px solid #58a6ff!important;background:rgba(88,166,255,.10)}' +
    '#sed-bar{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:2147483000;' +
    'display:flex;gap:10px;align-items:center;background:#161b22;border:1px solid #30363d;padding:10px 14px;' +
    'box-shadow:0 8px 28px rgba(0,0,0,.6);font-family:-apple-system,Segoe UI,Arial,sans-serif}' +
    '#sed-bar span{color:#c9d1d9;font-size:14px}#sed-bar .c{color:#f5b700;font-weight:600}' +
    '#sed-bar button{font-size:14px;padding:8px 16px;border:1px solid #30363d;cursor:pointer;background:#21262d;color:#c9d1d9}' +
    '#sed-bar .save{background:#238636;color:#fff;border-color:#238636}#sed-bar .save:hover{background:#2ea043}' +
    '#sed-toast{position:fixed;left:50%;bottom:80px;transform:translateX(-50%);z-index:2147483000;background:#0d1117;' +
    'color:#c9d1d9;border:1px solid #30363d;padding:12px 18px;max-width:80vw;font:14px -apple-system,Segoe UI,Arial;' +
    'box-shadow:0 8px 28px rgba(0,0,0,.6)}#sed-toast b{color:#58a6ff}';

  function qsa(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }
  function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function injectCSS() {
    if (document.getElementById('sed-css')) return;
    var st = document.createElement('style'); st.id = 'sed-css'; st.textContent = CSS;
    document.head.appendChild(st);
  }
  function toast(html, ms) {
    var t = document.getElementById('sed-toast');
    if (!t) { t = document.createElement('div'); t.id = 'sed-toast'; document.body.appendChild(t); }
    t.innerHTML = html;
    clearTimeout(t._t); t._t = setTimeout(function () { t.remove(); }, ms || 5000);
  }
  function repoPath() {
    var s = document.querySelector('script[src*="site-nav.js"]');
    var root = s ? s.src.replace(/site-nav\.js.*$/, '') : location.href.replace(/[^/]*$/, '');
    var here = location.href.split('#')[0].split('?')[0];
    var rel = here.indexOf(root) === 0 ? here.slice(root.length) : here.replace(/^.*\//, '');
    rel = decodeURIComponent(rel);
    if (!rel || rel.slice(-1) === '/') rel += 'index.html';
    return rel;
  }
  function applyEdits(src, edits) {
    Object.keys(edits).forEach(function (id) {
      var e = edits[id];
      var re = new RegExp('(<' + e.tag + '\\b[^>]*\\bdata-ed=("|\')' + esc(id) + '\\2[^>]*>)[\\s\\S]*?(</' + e.tag + '>)');
      if (re.test(src)) src = src.replace(re, function (m, open) { return open + e.html + '</' + e.tag + '>'; });
    });
    return src;
  }
  async function resolveFile(dir, path) {
    var parts = path.split('/'), d = dir;
    for (var i = 0; i < parts.length - 1; i++) d = await d.getDirectoryHandle(parts[i]);
    return d.getFileHandle(parts[parts.length - 1]);
  }
  function download(name, text) {
    var b = new Blob([text], { type: 'text/html' }), u = URL.createObjectURL(b);
    var a = document.createElement('a'); a.href = u; a.download = name; a.click();
    setTimeout(function () { URL.revokeObjectURL(u); }, 2000);
  }

  var api = {
    on: false,
    enable: function () {
      injectCSS();
      var eds = qsa('[data-ed]');
      if (!eds.length) { toast('No editable text is marked on this page yet. Tell Claude to open this page up.'); return; }
      eds.forEach(function (el) { el.setAttribute('contenteditable', 'true'); el.classList.add('sed-editable'); });
      var bar = document.createElement('div'); bar.id = 'sed-bar';
      bar.innerHTML = '<span>Editing <b class="c">' + eds.length + '</b> text blocks</span>' +
        '<button class="save">💾 Save &amp; keep</button><button class="exit">✕ Exit</button>';
      document.body.appendChild(bar);
      bar.querySelector('.save').onclick = api.save;
      bar.querySelector('.exit').onclick = function () { api.disable(); };
      this.on = true;
    },
    disable: function () {
      qsa('[data-ed]').forEach(function (el) { el.removeAttribute('contenteditable'); el.classList.remove('sed-editable'); });
      var b = document.getElementById('sed-bar'); if (b) b.remove();
      this.on = false;
      if ((location.hash || '').toLowerCase() === '#edit') history.replaceState(null, '', location.pathname + location.search);
    },
    unlock: function () {
      if (this.on) return;
      if (window.prompt('Edit passphrase:') === PASS) this.enable();
      else toast('Wrong passphrase.');
    },
    save: async function () {
      var edits = {};
      qsa('[data-ed]').forEach(function (el) { edits[el.getAttribute('data-ed')] = { tag: el.tagName.toLowerCase(), html: el.innerHTML }; });
      var file = repoPath(), src;
      try { src = await (await fetch(location.href, { cache: 'no-store' })).text(); }
      catch (e) { toast('Could not read the page source to save.'); return; }
      var out = applyEdits(src, edits);
      if (window.showDirectoryPicker) {
        try {
          if (!window.__smukhDir) { toast('Pick your <b>Smukh</b> repo folder…'); window.__smukhDir = await window.showDirectoryPicker({ mode: 'readwrite', id: 'smukh-repo' }); }
          var fh = await resolveFile(window.__smukhDir, file);
          var w = await fh.createWritable(); await w.write(out); await w.close();
          toast('Saved to <b>' + file + '</b>. Now <b>git push</b> and GitHub Pages updates.'); return;
        } catch (e) { /* fall back to download */ }
      }
      download(file.split('/').pop(), out);
      toast('Downloaded <b>' + file.split('/').pop() + '</b> — replace it in your repo and push.');
    },
    /* turn editing on/off based on whether the URL ends in #edit */
    sync: function () {
      if ((location.hash || '').toLowerCase() === '#edit') { if (!this.on) this.unlock(); }
      else { if (this.on) this.disable(); }
    }
  };

  window.__smukhEd = api;
  window.addEventListener('hashchange', function () { api.sync(); });
  if (document.readyState !== 'loading') api.sync();
  else document.addEventListener('DOMContentLoaded', function () { api.sync(); });
})();
