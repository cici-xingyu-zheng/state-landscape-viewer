// ============================================================================
//  SITE CONFIG — the only file you edit to change the site's structure.
//
//  DATASETS: listed in `datasets`. Each has an `id` (MUST match its folder name
//  under landscapes/) and a display `name` (shown in the landing-page dropdown).
//  All datasets share the `sections` structure below by default. If a dataset
//  ever diverges, give that dataset its own `sections` array to override.
//
//  VIEW FILES: `file` is just the leaf filename. The full path is built as
//  landscapes/<dataset id>/<file>, so filenames stay identical across datasets.
//  Folder ids and filenames are CASE-SENSITIVE on GitHub Pages.
// ============================================================================

const SITE = {
  title: "Interneuron state landscapes",

  // Landing-page banner (shown in a white card above the title; landing page only).
  banner: {
    src: "assets/waddle_banner.jpg",
    alt: "WADDLE: Wells And Diffusion Dynamics from Landscape Estimation",
  },

  // Landing-page intro paragraph.
  intro:
    'WADDLE (Wells And Diffusion Dynamics from Landscape Estimation) estimates an energy landscape ' +
    'from single-cell RNA-seq data. Wells in the landscape mark candidate cell types. ' +
    'This page shows landscapes for cortical interneurons from two Allen Institute datasets, ' +
    '<a href="https://www.nature.com/articles/s41586-018-0654-5" target="_blank" rel="noopener">Tasic 2018</a>' +
    ' and ' +
    '<a href="https://www.nature.com/articles/s41586-023-06812-z" target="_blank" rel="noopener">Yao 2023</a>' +
    '. A manuscript is in preparation.',

  // Credit line under the intro (landing page).
  credit: "Developed by Cici Xingyu Zheng and colleagues at the Allen Institute.",

  equation: "U(S) = \u2212log q(S)",  // (no longer displayed; kept for reference)

  // Caption shown on every viewer page (override per page with `instructions:`).
  instructions:
    "2D projection: smoothed energy surface on top, cells on the floor below. " +
    "Buttons above the plot recolor the cells: Basin, t-type, and Supertype (native on 10x v2; on Smart-seq, " +
    "\"Supertype (mapped)\" from MapMyCells). Dotted lines drop from the surface " +
    "to each basin's lowest cell. In the legend, single-click an item to hide it; double-click to show it on its own. " +
    "The line above the plot unfolds into the full caption.",

  // Order matters: the first dataset is the default selection.
  // Pages added 2026-11-17 from StateDynamics-type: 10x v2 from results/261117/poster_html_landscapes/
  // (script poster_2610_html_261117.py), Smart-seq from results/261117/poster_html_landscapes_t3b/
  // (script poster_2610_html_t3b_261117.py). Both datasets have the same six files, so no
  // `omit` list is needed. To hide a view a dataset lacks, add
  // omit: ["FILE.html", ...] to that dataset.
  datasets: [
    // `hint` on a dataset is the line shown under the title on every viewer page of that dataset
    // (a page can still override it with its own `hint`).
    { id: "tasic2018_visp", name: "Tasic 2018 VISp (Smart-seq)",
      hint: "Buttons inside the plot: Basin, t-type, Supertype (mapped by MapMyCells)" },
    // Folder id kept as yao2023_visp so old links still resolve; the pages are 10x v2.
    { id: "yao2023_visp", name: "Yao 2023 VIS (10x v2)",
      hint: "Buttons inside the plot: Basin, t-type (mapped from Tasic), Supertype",
      // `meta` on a dataset replaces the card text of the named pages for that dataset only.
      meta: { pvalb: "MGE-derived; energy heights are not comparable with Sst and Vip in this dataset" } },
  ],

  // Shared structure used by every dataset (unless a dataset defines its own).
  sections: [
    {
      id: "subclass",
      eyebrow: "Energy landscapes",
      heading: "Subclass level",
      blurb: "Each landscape shows one interneuron subclass. The surface is the energy U, smoothed over two diffusion components, " +
             "with the cells drawn on the floor below and coloured by basin. Each subclass has two views, DC1\u2013DC2 and DC3\u2013DC4: " +
             "open one from the chips on its card, or switch with the Projection dropdown above the plot. " +
             "These are 2D projections of a higher-dimensional landscape, and smoothing flattens them, so barrier heights should not be read off the surface.",
      accent: "teal",
      // `color` = Tasic 2018 subclass colour (Allen AIT29 table, column subclass_color); it tints the
      // top bar and ring icon of the card for both datasets.
      pages: [
        {
          id: "sst", name: "Sst", color: "#F15A29", meta: "MGE-derived; 5 basins, matched one-to-one across the two datasets",
          views: [
            { label: "DC1\u2013DC2", file: "SST_DC12.html" },
            { label: "DC3\u2013DC4", file: "SST_DC34.html" },
          ],
        },
        {
          id: "vip", name: "Vip", color: "#70559A", meta: "CGE-derived",
          views: [
            { label: "DC1\u2013DC2", file: "VIP_DC12.html" },
            { label: "DC3\u2013DC4", file: "VIP_DC34.html" },
          ],
        },
        {
          id: "pvalb", name: "Pvalb", color: "#D93137", meta: "MGE-derived",
          views: [
            { label: "DC1\u2013DC2", file: "PVALB_DC12.html" },
            { label: "DC3\u2013DC4", file: "PVALB_DC34.html" },
          ],
        },
      ],
    },
  ],
};

// --- helpers (used by index.html and view.html; no need to edit) --------------
function getDataset(datasetId) {
  return SITE.datasets.find(function (d) { return d.id === datasetId; }) || SITE.datasets[0];
}
function getSections(dataset) {
  const base = dataset.sections || SITE.sections;
  const omit = dataset.omit || [];
  if (!omit.length && !dataset.hint && !dataset.meta) return base;
  // Return filtered COPIES so the shared structure is never mutated.
  return base.map(function (section) {
    const pages = section.pages.map(function (page) {
      const views = page.views.filter(function (v) { return omit.indexOf(v.file) === -1; });
      const meta = (dataset.meta && dataset.meta[page.id]) || page.meta;
      return Object.assign({}, page, { views: views, hint: page.hint || dataset.hint, meta: meta });
    }).filter(function (page) { return page.views.length > 0; });
    return Object.assign({}, section, { pages: pages });
  });
}
function findPage(sections, pageId) {
  for (const section of sections) {
    const page = section.pages.find(function (p) { return p.id === pageId; });
    if (page) return { section: section, page: page };
  }
  return null;
}
function viewPath(datasetId, file) {
  return "landscapes/" + datasetId + "/" + file;
}
