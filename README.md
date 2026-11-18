# Interneuron State Landscapes

Interactive 3D energy landscapes of cortical interneuron states, built from single-cell
transcriptomic data.

**[View the site](https://cici-xingyu-zheng.github.io/state-landscape-viewer/)**

## About

We apply the method from Zheng et al. 2026 (manuscript in preparation) to two Allen
Institute datasets from mouse visual cortex:

- [Tasic et al. 2018](https://www.nature.com/articles/s41586-018-0654-5), VISp, Smart-seq
- [Yao et al. 2023](https://www.nature.com/articles/s41586-023-06812-z), VIS, 10x v2

There is one landscape per interneuron subclass (Sst, Vip, Pvalb) and dataset, each in
two projections: DC1-DC2 and DC3-DC4 (diffusion components).

## What a page shows

- **Surface.** The energy U = -log(density), smoothed over the two diffusion components
  (kernel regression of per-cell U). Low regions are densely populated cell states.
- **Cells.** Every cell is drawn on the floor below the surface.
- **Drop lines.** Under the Basin coloring, a dotted line runs from the surface down to
  the lowest cell of each basin. One click on its legend entry hides them.
- **Color buttons** (inside the plot):

| Button | Smart-seq pages | 10x v2 pages |
|---|---|---|
| Basin | basins of the landscape | basins of the landscape; a basin shares a Smart-seq color only when the two are matched |
| t-type | native Tasic t-type | Tasic t-type mapped by nearest centroid |
| Supertype | "Supertype (mapped)": 10x supertype from MapMyCells | native 10x supertype |

Low-confidence mapped cells (below 0.80) are shown in light grey. MapMyCells maps to the
whole-brain taxonomy, so a few Smart-seq cells map outside their subclass.

## Reading the surfaces

These are 2D projections of a higher-dimensional landscape, and smoothing flattens them,
so barrier heights should not be read off the surface. Heights on the 10x v2 Pvalb pages
are not comparable with Sst and Vip (smaller k/n).

The plots are interactive Plotly figures: rotate, zoom, hover, and show or hide groups
from the legend.

## Repository structure

```
index.html      landing page
view.html       landscape viewer
config.js       datasets, pages, and projections shown on the site
styles.css
assets/
  waddle_banner.jpg
  plotly-3.3.1.min.js   plotly.js, served from the site itself (no CDN)
landscapes/
  tasic2018_visp/   Smart-seq pages (exported Plotly HTML)
  yao2023_visp/     10x v2 pages
```

It is a static site with no build step. The site's structure comes from `config.js`:
to add a page, add an entry there and put the matching HTML file in
`landscapes/<dataset>/`.

If a 3D view does not start on a device, the plot area says so. Add `&debug=1` to the
viewer address (or `?debug=1` to a plot page) to see the browser details and the error on
the page itself.

To run it locally:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Citation

If you use these visualizations, please cite Zheng et al. 2026 (citation to come).
