# Parsim Architecture

## Stack

- React and TypeScript, built and served by Vite
- CoreUI React components and CoreUI SCSS
- React Router with `HashRouter`
- Redux for sidebar visibility and collapse state
- CoreUI Chart.js wrappers for Parsim dashboard analytics

## Application flow

`src/index.tsx` mounts the Redux provider and `App`. `App.tsx` initializes the theme and defines the public error routes, then renders the shared `DefaultLayout` for application routes. The layout combines the header, sidebar, content router, and footer.

`src/routes.ts` is the route source for `AppContent` and route-aware breadcrumbs. Views are lazy-loaded. `src/_nav.tsx` separately defines the reusable sidebar links; its destinations map to existing Parsim routes.

## Source areas

- `src/components/` — shared application shell, navigation, and breadcrumbs
- `src/layout/` — dashboard layout composition
- `src/views/dashboard/` — Parsim overview, metric cards, and token-optimization chart
- `src/views/parsim/` — product-specific views
- `src/views/error-pages/` — 404 and 500 pages
- `src/assets/brand/` — full and compact Parsim logos
- `src/scss/` — CoreUI theme, Parsim styling, and scrollbar styles
- `public/` — web manifest and favicon

## Theme and state

CoreUI color modes and local storage persist the light/dark theme. Redux contains sidebar visibility and collapsed state only; view-specific state remains in React components.

## Build

Vite uses `vite.config.mjs`, compiles SCSS, applies Autoprefixer, and writes production output to `build/`. The build directory is generated and should not be edited as source.
