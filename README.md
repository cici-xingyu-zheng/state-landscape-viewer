# State Landscape Viewer

Drop these four files into your `StateLandscapeViewer/` folder, right next to the
existing `landscapes/` folder:

```
StateLandscapeViewer/
├── index.html      landing page   (don't edit)
├── view.html       viewer page    (don't edit)
├── config.js       ← edit this to add/rename views
├── styles.css      look & feel
└── landscapes/     your exported Plotly HTMLs (already here)
```

`config.js` is already wired to your current 11 files. To add a projection later, add a
`{ label, file }` line to the right page and drop the HTML into `landscapes/`. The first
entry in each list is the default. Filenames are **case-sensitive** on GitHub Pages, so
they must match exactly (`SST_DC12.html`, not `sst_DC12.html`).

## Preview locally first

```bash
cd StateLandscapeViewer
python3 -m http.server 8000
# open http://localhost:8000
```

Use the server — don't double-click `index.html` (the `file://` protocol blocks part of
the loading logic).

## Publish on GitHub Pages

See the chat message for the step-by-step. In short: create a GitHub repo, push this
folder, then Settings → Pages → deploy from `main` / root. Live at
`https://<you>.github.io/<repo>/`, and every push updates it.
