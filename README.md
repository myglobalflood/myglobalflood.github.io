# AHS Lab

Website for the Advanced Hydrological Simulation group at Lanzhou University.

- Public site: https://grups666.github.io/AHSLab/
- Research focus: flood modelling, global change, Earth observation, and resilient water systems
- Framework: Next.js with a static GitHub Pages export and a Vinext deployment

## Development

```bash
npm install
npm run dev
```

The site is organized as separate routes for Home, Research, Profile, Work, and Contact.

## Publishing

Pushes to `main` automatically build and deploy the static export through GitHub Actions. The production project path is `/AHSLab/`; route and asset helpers keep that deployment compatible with the root-path Vinext preview.
