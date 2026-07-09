// ============================================================================
//  SITE CONFIG — the only file you edit to change the site's structure.
//  Add a view  -> add a { label, file } entry to a page's `views`.
//  The FIRST entry in each `views` list is the default shown on load.
//  IMPORTANT: filenames are case-sensitive on GitHub Pages — they must match
//  the files in landscapes/ exactly (e.g. SST_DC12.html, not sst_DC12.html).
// ============================================================================

const SITE = {
  title: "Interneuron state landscapes",
  subtitle: "Diffusion-map energy surfaces with cell populations projected on the bottom for the two diffusion axes viewed.",
  equation: "U(S) = \u2212log q(S)",

  sections: [
    {
      id: "subclass",
      eyebrow: "Grouping 1",
      heading: "Subclass level",
      blurb: "Each landscape shows one interneuron subclass. Use the dropdown to change the diffusion-component projection.",
      accent: "teal",
      pages: [
        {
          id: "sst", name: "Sst", meta: "MGE-derived",
          views: [
            { label: "DC1\u2013DC2", file: "landscapes/SST_DC12.html" },
            { label: "DC2\u2013DC3", file: "landscapes/SST_DC23.html" },
            { label: "DC3\u2013DC4", file: "landscapes/SST_DC34.html" },
          ],
        },
        {
          id: "vip", name: "Vip", meta: "CGE-derived",
          views: [
            { label: "DC1\u2013DC2", file: "landscapes/VIP_DC12.html" },
            { label: "DC2\u2013DC3", file: "landscapes/VIP_DC23.html" },
          ],
        },
      ],
    },

    {
      id: "origin",
      eyebrow: "Grouping 2",
      heading: "Same evolutionary origin",
      blurb: "Each landscape pools an entire eminence lineage. The dropdown changes the projection; switch coloring by subclass vs supertype with the buttons inside the plot.",
      accent: "amber",
      pages: [
        {
          id: "mge", name: "MGE", meta: "Medial ganglionic eminence",
          hint: "Subclass / supertype toggle is inside the plot",
          views: [
            { label: "DC1\u2013DC2",  file: "landscapes/MGE_DC12_toggle.html" },
            { label: "DC2\u2013DC3",  file: "landscapes/MGE_DC23_toggle.html" },
            { label: "DC1\u2013DCk8", file: "landscapes/MGE_DC1DCk8_toggle.html" },
          ],
        },
        {
          id: "cge", name: "CGE", meta: "Caudal ganglionic eminence",
          hint: "Subclass / supertype toggle is inside the plot",
          views: [
            { label: "DC1\u2013DC2",   file: "landscapes/CGE_DC12_toggle.html" },
            { label: "DC2\u2013DC3",   file: "landscapes/CGE_DC23_toggle.html" },
            { label: "DC1\u2013DCk19", file: "landscapes/CGE_DC1DCk19_toggle.html" },
          ],
        },
      ],
    },
  ],
};

// --- helpers used by index.html and view.html (no need to edit below) ---------
function findPage(pageId) {
  for (const section of SITE.sections) {
    const page = section.pages.find((p) => p.id === pageId);
    if (page) return { section, page };
  }
  return null;
}
