# Parsim Dashboard

Parsim is an AI context optimization dashboard built with React, TypeScript, Vite, CoreUI, and React Router. The UI is based on the [CoreUI Free React Admin Template](https://github.com/coreui/coreui-free-react-admin-template); see [ATTRIBUTION.md](./ATTRIBUTION.md) and [LICENSE](./LICENSE) for notices.

## Requirements

- Node.js supported by the installed Vite version
- pnpm

## Development

```bash
pnpm install
pnpm start
```

The Vite development server runs at `http://localhost:3000`.

## Validation and build

```bash
pnpm run lint
pnpm exec tsc --noEmit
pnpm run build
pnpm run serve
```

Production output is generated in `build/`.

## Application structure

- `src/views/dashboard/` — Parsim overview, metrics, and token-optimization chart
- `src/views/parsim/` — analytics, context explorer, optimization rules, agents/projects, usage, API keys, and settings
- `src/views/error-pages/` — standalone 404 and 500 pages
- `src/components/` — shared header, sidebar, content, footer, and breadcrumbs
- `src/layout/DefaultLayout.tsx` — shared dashboard layout
- `src/_nav.tsx` — reusable sidebar navigation configuration
- `src/routes.ts` — lazy-loaded application routes
- `src/scss/style.scss` — CoreUI theme and Parsim styles

The application uses hash-based routing. The old CoreUI authentication and component-demo pages are not part of the Parsim application.
