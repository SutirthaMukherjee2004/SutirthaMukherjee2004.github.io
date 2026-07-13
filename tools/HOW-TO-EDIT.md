# Editing your site's text in place (no code, no bookmark)

The editor is already loaded on every page. To edit, you just add **`#edit`**
to the page's web address.

> **Security note (honest):** GitHub Pages is *static* hosting, so a real
> server password is impossible. The passphrase is only a light gate — the
> real protection is that **Saving needs your own computer's repo folder and
> your `git push`**. A visitor can never write to your repo.

## To edit
1. Open the page in **Chrome or Edge**.
2. In the address bar, add **`#edit`** at the end and press Enter, e.g.:
   `https://sutirthamukherjee2004.github.io/#edit`
3. Type the passphrase: **`smukh-edit`**
4. Editable text gets a **dashed yellow outline** — click it and type.
5. Click **💾 Save & keep**. The first save asks you to **pick your `Smukh`
   repo folder** (once per session); it writes the change into the file.
6. `git push` (or GitHub Desktop → Commit → Push). The live site updates in ~1 min.
   Click **✕ Exit** when done (it also removes `#edit` from the address).

That's it: **add `#edit` → passphrase → click text → type → Save → push.**

## Which text is editable?
Everything marked `data-ed="…"`. Currently editable:
- **Home** — the intro/bio paragraphs
- **Research** — the intro
- **Publications, Galaxy Comics, Arts, Philosophy, What's New** — their main text
Ask Claude to "open up page X" to make more text editable. The editor only
touches marked text — your layout/code stays safe.

## Notes
- **Chrome / Edge** only for saving-to-folder. Firefox/Safari will *download*
  the edited file instead, which you drop into your repo and push.
- Change the passphrase in `tools/smukh-editor.js` (`var PASS = 'smukh-edit';`).
- Research topics' write-ups/plots are edited in `research/research-data.js`.
