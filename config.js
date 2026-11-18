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

  // Landing-page intro paragraph. The citation is a PLACEHOLDER link —
  // replace href="#" with the paper URL when it's available.
  intro:
    'We apply the method developed in ' +
    //'<a href="#" target="_blank" rel="noopener">Zheng et al. 2026</a>' +
    'Zheng et al. 2026 [will add link once we finished the manuscript]' +
    ' on Allen Brain datasets, including ' +
    '<a href="https://www.nature.com/articles/s41586-018-0654-5" target="_blank" rel="noopener">Tasic 2018</a>' +
    ' and ' +
    '<a href="https://www.nature.com/articles/s41586-023-06812-z" target="_blank" rel="noopener">Yao 2023</a>' +
    '. This page hosts visualizations for diffusion-map energy surfaces with cell populations projected on top.',

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
      hint: "Buttons inside the plot: Basin, t-type (mapped from Tasic), Supertype" },
  ],

  // Shared structure used by every dataset (unless a dataset defines its own).
  sections: [
    {
      id: "subclass",
      eyebrow: "Poster-style landscapes",
      heading: "Subclass level",
      blurb: "Each landscape shows one interneuron subclass. The surface is a kernel-smoothed energy U over two diffusion components, " +
             "with the cells on the floor colored by basin. Use the dropdown to switch between DC1\u2013DC2 and DC3\u2013DC4. " +
             "These are 2D projections of a higher-dimensional landscape, and smoothing flattens them, so barrier heights should not be read off the surface.",
      accent: "teal",
      pages: [
        {
          id: "sst", name: "Sst", meta: "MGE-derived; 5 basins, matched one-to-one across the two datasets",
          views: [
            { label: "DC1\u2013DC2", file: "SST_DC12.html" },
            { label: "DC3\u2013DC4", file: "SST_DC34.html" },
          ],
        },
        {
          id: "vip", name: "Vip", meta: "CGE-derived",
          views: [
            { label: "DC1\u2013DC2", file: "VIP_DC12.html" },
            { label: "DC3\u2013DC4", file: "VIP_DC34.html" },
          ],
        },
        {
          id: "pvalb", name: "Pvalb", meta: "MGE-derived; heights not comparable with Sst and Vip on 10x (smaller k/n)",
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
  if (!omit.length && !dataset.hint) return base;
  // Return filtered COPIES so the shared structure is never mutated.
  return base.map(function (section) {
    const pages = section.pages.map(function (page) {
      const views = page.views.filter(function (v) { return omit.indexOf(v.file) === -1; });
      return Object.assign({}, page, { views: views, hint: page.hint || dataset.hint });
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
