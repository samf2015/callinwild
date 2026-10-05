# Callin Wild website

The Callin Wild website, built with [Astro](https://astro.build) and edited with [TinaCMS](https://tina.io).
The published site is plain static files (HTML, CSS, JavaScript, images): no PHP or database is needed on the web server.

## Run it locally

```bash
npm install
npm run dev
```

- Website: http://localhost:4322
- Editor (local mode, no login): http://localhost:4322/admin/index.html

Local mode saves edits straight to the files in `src/content/`. It is for local use only and must never be deployed to a public server.

## Build the static site

```bash
npm run build
```

The finished site is written to `dist/`. Upload its contents to the web server's document root (e.g. `httpdocs` on Plesk).

## Where things live

| Folder | Contents |
|---|---|
| `src/content/` | All site content (one Markdown file per news story, team member, service, legal page; `settings/` holds single pages such as the homepage and mega menu) |
| `tina/config.ts` | The editor's collections and fields |
| `src/pages/`, `src/components/`, `src/layouts/` | Page templates |
| `public/` | Stylesheets, fonts, images and files served as-is |
