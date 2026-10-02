# Interneuron State Landscapes

Interactive 3D energy landscapes of cortical interneuron states, built from single-cell
transcriptomic data.

**[View the site →](https://cici-xingyu-zheng.github.io/state-landscape-viewer/)**

## About

We apply the method from Zheng et al. 2026 (manuscript in preparation) to two Allen
Institute datasets from mouse primary visual cortex (VISp):

- [Tasic et al. 2018](https://www.nature.com/articles/s41586-018-0654-5), Smart-seq
- [Yao et al. 2023](https://www.nature.com/articles/s41586-023-06812-z), 10x v3

Each landscape is an energy surface, *U(S) = −log q(S)*, over a 2D diffusion-map
projection. The cell populations are plotted underneath it. Low regions of the surface
are densely populated cell states, and ridges mark the transitions between them.

The landscapes come at two levels of grouping:

| Level | Landscapes | Colored by |
|---|---|---|
| Subclass | Sst, Vip | type |
| Developmental origin | MGE, CGE (whole eminence lineage) | subclass or supertype (toggle inside the plot) |

For each landscape you can switch between several diffusion-component projections
(DC1–DC2, DC2–DC3, and others). The plots are interactive Plotly figures, so you can
rotate, zoom, hover, and show or hide populations from the legend.

## Repository structure

```
├── index.html      landing page
├── view.html       landscape viewer
├── config.js       datasets, groupings, and projections shown on the site
├── styles.css
└── landscapes/
    ├── tasic2018_visp/   exported Plotly HTML figures
    └── yao2023_visp/
```

It's a static site with no build step. All of the site's structure comes from
`config.js`, so adding a dataset or projection means adding an entry there and putting
the matching HTML file in `landscapes/<dataset>/`.

To run it locally:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Citation

If you use these visualizations, please cite Zheng et al. 2026 (citation to come).
