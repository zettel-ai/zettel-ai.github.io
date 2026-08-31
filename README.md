This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for optimized font loading.

## Zettel Parcel landing page

The Parcel managed-audit landing page lives at `/parcel/` while the existing Zettel Ops/drayage homepage remains at `/`.

Before modifying Next.js code, follow `AGENTS.md` and read the relevant installed Next 16 documentation under `node_modules/next/dist/docs/`.

Run the Parcel verification suite with:

```bash
npm ci
npm run validate:parcel
npm run lint
npm run build
test -f out/parcel/index.html
```

Parcel implementation files are route-local under `src/app/parcel/`. Do not move Parcel semantics, audit logic, graph/RAG functionality, or carrier automation into this marketing repository.

### Parcel diagrams

Editable Parcel diagram source lives in the separate private repository `zettel-ai/website_diagram` under `parcel/*.d2`. This website repository contains reviewed SVG copies only under `public/diagrams/parcel/`.

Diagram provenance is recorded in `docs/superpowers/parcel-diagram-sources.md`. Do not hand-edit copied SVGs; update the D2 source, render and review it in `website_diagram`, then copy the reviewed SVG bytes and update the provenance record.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js).

## Deploy on Vercel

The easiest way to deploy a Next.js app is with the Vercel Platform.

See the Next.js deployment documentation for more details.
