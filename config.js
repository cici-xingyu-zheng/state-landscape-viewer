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
    "2D projection: energy landscape on top, cell coordinates on the bottom. " +
    "In the legend, single-click a type to hide it; double-click a type to highlight it on its own.",

  // Order matters: the first dataset is the default selection.
  datasets: [
    { id: "tasic2018_visp", name: "Tasic 2018 VISp (Smart-seq)" },
    // `omit` lists leaf filenames this dataset doesn't have yet; those views are
    // dropped from its cards and dropdowns. Remove an entry once you add the file.
    {
      id: "yao2023_visp", name: "Yao 2023 VISp (10x-v3)",
      omit: ["SST_DC34.html", "MGE_DC1DCk8_toggle.html", "CGE_DC1DCk19_toggle.html"],
    },
  ],

  // Shared structure used by every dataset (unless a dataset defines its own).
  sections: [
    {
      id: "subclass",
      eyebrow: "Grouping Level 1",
      heading: "Subclass level",
      blurb: "Each landscape shows one interneuron subclass. Use the dropdown to change the diffusion-component projection.",
      accent: "teal",
      pages: [
        {
          id: "sst", name: "Sst", meta: "MGE-derived",
          views: [
            { label: "DC1\u2013DC2", file: "SST_DC12.html" },
            { label: "DC2\u2013DC3", file: "SST_DC23.html" },
            { label: "DC3\u2013DC4", file: "SST_DC34.html" },
          ],
        },
        {
          id: "vip", name: "Vip", meta: "CGE-derived",
          views: [
            { label: "DC1\u2013DC2", file: "VIP_DC12.html" },
            { label: "DC2\u2013DC3", file: "VIP_DC23.html" },
          ],
        },
      ],
    },
    {
      id: "origin",
      eyebrow: "Grouping Level 2",
      heading: "Same developmental origin",
      blurb: "Each landscape pools an entire eminence lineage. The dropdown changes the projection; switch coloring by subclass vs supertype with the buttons inside the plot.",
      accent: "amber",
      pages: [
        {
          id: "mge", name: "MGE", meta: "Medial ganglionic eminence",
          hint: "Subclass / supertype toggle is inside the plot",
          views: [
            { label: "DC1\u2013DC2",  file: "MGE_DC12_toggle.html" },
            { label: "DC2\u2013DC3",  file: "MGE_DC23_toggle.html" },
            { label: "DC1\u2013DCk8", file: "MGE_DC1DCk8_toggle.html" },
          ],
        },
        {
          id: "cge", name: "CGE", meta: "Caudal ganglionic eminence",
          hint: "Subclass / supertype toggle is inside the plot",
          views: [
            { label: "DC1\u2013DC2",   file: "CGE_DC12_toggle.html" },
            { label: "DC2\u2013DC3",   file: "CGE_DC23_toggle.html" },
            { label: "DC1\u2013DCk19", file: "CGE_DC1DCk19_toggle.html" },
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
  if (!dataset.omit || !dataset.omit.length) return base;
  const omit = dataset.omit;
  // Return filtered COPIES so the shared structure is never mutated.
  return base.map(function (section) {
    const pages = section.pages.map(function (page) {
      const views = page.views.filter(function (v) { return omit.indexOf(v.file) === -1; });
      return Object.assign({}, page, { views: views });
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
