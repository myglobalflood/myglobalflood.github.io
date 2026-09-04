# Flood & Global Change Group

Official website for the Flood & Global Change Group at Lanzhou University.

- Public site: https://myglobalflood.github.io/
- Research focus: flood modelling, global change, Earth observation, and resilient water systems
- Framework: Next.js with a static GitHub Pages export and a Vinext deployment

## Development

```bash
npm install
npm run dev
```

The site is organized as separate routes for Home, Research, People, Publications, and Contact.

## Publishing

Pushes to `main` automatically build and deploy the static export through GitHub Actions. The production site uses the account-level root path, while route and asset helpers keep the deployment compatible with the Vinext preview.
