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

The site is organized as separate routes for Home, Research, People, Publications, News, and Contact.

Research includes Projects, Data, Code, and Funding. People includes current members, alumni, and collaborators; Publications keeps papers, books, patents, and software copyrights separate. News items, member profiles, and model resource links are maintained in `app/site-data.ts`.

## Publishing

Pushes to `main` automatically build and deploy the static export through GitHub Actions. The production site uses the account-level root path, while route and asset helpers keep the deployment compatible with the Vinext preview.
