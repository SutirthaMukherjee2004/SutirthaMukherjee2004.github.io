/* ============================================================
   research-ui.js  —  renders, from window.RESEARCH:
     • the research sidebar  (any element with [data-research-menu])
     • the cards grid        (#research-cards, with auto plot montage)
     • the detail content    (#research-detail, uses body[data-topic])
   Loaded on research.html and on every research detail page, so the
   header nav + sidebar stay identical everywhere.
   ============================================================ */
(function () {
  var R = window.RESEARCH;
  if (!R) return;
  function url(rel) { return new URL(rel, R.base).href; }
  function el(tag, cls) { var e = document.createElement(tag); if (cls) e.className = cls; return e; }
  function previewSrc(src) {
    if (!src || typeof src !== 'string') return src;
    return src.indexOf('paper-figures-web/') !== -1
      ? src.replace('paper-figures-web/', 'paper-figures-thumb/')
      : src;
  }
  function plotPreview(plot) { return (plot && plot.preview) || previewSrc(plot && plot.src); }
  function plotFull(plot) { return (plot && (plot.full || plot.src)) || ''; }

  /* ---- sidebar: identical list of topics on every research page ---- */
  function buildMenu(container) {
    var active = document.body.getAttribute('data-topic');
    container.innerHTML = '';
    R.topics.forEach(function (t) {
      var a = document.createElement('a');
      a.href = url(t.page);
      a.textContent = t.title;
      if (t.id === active) a.className = 'active';
      container.appendChild(a);
    });
  }

  /* ---- card thumbnail: montage of plots, else a single thumb, else blank ---- */
  function buildMontage(topic) {
    var box = el('div', 'card-montage');
    var shown = topic.previewPlots || (topic.plots || []).slice(0, 4);
    if (shown.length) {                       // one or more plots -> ensemble montage
      box.classList.add('m' + shown.length);
      shown.forEach(function (p) {
        var img = document.createElement('img');
        img.src = url(plotPreview(p)); img.alt = p.caption || topic.title; img.loading = 'lazy';
        img.decoding = 'async';
        box.appendChild(img);
      });
    } else if (topic.thumb) {                  // legacy single figure
      box.classList.add('m1');
      var t = document.createElement('img');
      t.src = url(previewSrc(topic.thumb)); t.alt = topic.title; t.loading = 'lazy';
      t.decoding = 'async';
      box.appendChild(t);
    } else {                                   // nothing yet -> blank top
      box.classList.add('empty');
    }
    return box;
  }

  /* ---- cards grid on the main research page ---- */
  function buildCards(container) {
    container.innerHTML = '';
    R.topics.forEach(function (t) {
      var a = el('a', 'rcard'); a.href = url(t.page);
      a.appendChild(buildMontage(t));
      var body = el('div', 'rcard-body');
      var h = document.createElement('h3'); h.textContent = t.title; body.appendChild(h);
      var more = el('span', 'read-more'); more.textContent = 'read more →'; body.appendChild(more);
      a.appendChild(body);
      container.appendChild(a);
    });
  }

  /* ---- detail page: title + writing + plots gallery ---- */
  function buildDetail(container) {
    var active = document.body.getAttribute('data-topic');
    var topic = R.topics.filter(function (t) { return t.id === active; })[0];
    if (!topic) return;
    container.innerHTML = '';
    var h = document.createElement('h1'); h.textContent = topic.title; container.appendChild(h);
    if (topic.summary) {
      var w = el('div', 'research-writing'); w.innerHTML = topic.summary; container.appendChild(w);
    } else {
      var note = el('p', 'research-empty');
      note.textContent = 'Details and plots for this project are coming soon.';
      container.appendChild(note);
    }
    if (topic.plots.length) {
      var grid = el('div', 'research-plots');
      topic.plots.forEach(function (pl) {
        var fig = document.createElement('figure');
        var high = plotFull(pl);
        var link = document.createElement('a');
        link.className = 'plot-image-link';
        link.href = url(high);
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        var img = document.createElement('img'); img.src = url(plotPreview(pl)); img.alt = pl.caption || topic.title; img.loading = 'lazy'; img.decoding = 'async';
        link.appendChild(img);
        fig.appendChild(link);
        if (pl.caption) { var cap = document.createElement('figcaption'); cap.textContent = pl.caption; fig.appendChild(cap); }
        var hi = document.createElement('a');
        hi.className = 'plot-highres';
        hi.href = url(high);
        hi.target = '_blank';
        hi.rel = 'noopener noreferrer';
        hi.textContent = 'See higher resolution';
        fig.appendChild(hi);
        grid.appendChild(fig);
      });
      container.appendChild(grid);
    }
    document.title = 'Sutirtha Mukherjee';
  }

  function run() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-research-menu]'), buildMenu);
    var cards = document.getElementById('research-cards'); if (cards) buildCards(cards);
    var detail = document.getElementById('research-detail'); if (detail) buildDetail(detail);
  }
  if (document.readyState !== 'loading') run();
  else document.addEventListener('DOMContentLoaded', run);
})();
