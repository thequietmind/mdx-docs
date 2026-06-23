# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.0] - 2026-06-23

### Added

- `ColorModeToggle` component and `useColorMode` hook, both exported from the
  package. `ColorModeToggle` is the toolbar's light/dark switch as a standalone
  component you can render anywhere and position via `sx` (other props pass
  through to the underlying MUI `IconButton`). `useColorMode` exposes
  `{ darkMode, setDarkMode, toggleColorMode }` for building a custom control.
  Together these let full-bleed pages that hide the toolbar with `toolbar: false`
  keep light/dark switching

### Notes

- Backward compatible — the toolbar's built-in toggle is unchanged and the new
  exports are purely additive. `ColorModeToggle` and `useColorMode` read the
  color-mode context provided by the default `createApp` shell; in a custom
  layout built from `DocsProvider` and `MDXContent`, continue to manage theme
  state yourself

## [1.5.0] - 2026-06-23

### Added

- Per-page layout control via MDX frontmatter, applied consistently across
  prerendered HTML and client hydration:
  - `sidebar: false` hides the navigation sidebar on that page
  - `toolbar: false` hides the top toolbar (AppBar) on that page
  - `footer: false` hides the footer on that page (independent of the global
    `footer` config)
  - `maxWidth` sets the content width cap — a number (px) for a custom cap, or
    `false` to remove the cap and let content fill the available width

### Fixed

- Button text now renders vertically centered in Firefox. The bundled global
  stylesheet carried leftover defaults — a global `button` reset and
  `text-rendering: optimizeLegibility` — that interfered with MUI's button
  rendering; these are removed and the base font stack is now owned by the MUI
  theme
- Removed regular expressions vulnerable to catastrophic backtracking (ReDoS)
  from route normalization and server-side route handling

### Changed

- Added `remark-frontmatter` and `remark-mdx-frontmatter` as dependencies to
  power per-page frontmatter
- Bumped peer dependencies: `vite` to `^8.0.16`, `@vitejs/plugin-react` to
  `^6.0.2`, and `react-router-dom` to `^7.18.0`. Consumers should upgrade Vite
  to v8 and `@vitejs/plugin-react` to v6 when updating

### Notes

- Backward compatible — pages without the new frontmatter fields render exactly
  as before (sidebar, toolbar, and footer shown; content capped at 960px)

## [1.4.1] - 2026-06-19

### Fixed

- Site name and description placeholders (`%SITE_NAME%`, `%SITE_DESCRIPTION%`)
  in `index.html` are now replaced on every occurrence instead of only the
  first. Templates can reuse these placeholders across `og:` and `twitter:`
  tags and have them resolve correctly in the dev server and in
  `prerender: false` builds (prerendered output was already correct)

## [1.4.0] - 2026-06-19

### Added

- Footer support. `createApp` and `DocsProvider` accept a `footer` option of the
  shape `{ enabled, content }`. Every site now renders a minimal "Built with MDX
  Docs" attribution footer by default; pass `footer.content` to render your own
  footer node instead, or `footer: { enabled: false }` to remove it entirely
- Generator and version metadata in prerendered pages. Production builds inject a
  `<meta name="generator" content="@quietmind/mdx-docs">` tag and a
  `data-mdx-docs-version` attribute on the `<html>` element

### Notes

- The default "Built with MDX Docs" footer is new and appears on every site
  after upgrading. Set `footer: { enabled: false }` to opt out, or pass
  `footer.content` to customize it

## [1.3.3] - 2026-06-17

### Fixed

- Bare HTML `<a>` elements now use the theme primary color to match
  markdown-syntax links instead of the browser default link color, in light and
  dark mode

## [1.3.2] - 2026-06-17

### Fixed

- Style all links consistently regardless of syntax — both markdown links and
  bare HTML `<a>` elements written in `.mdx` are now underlined by default with
  the underline removed on hover, in light and dark mode

## [1.3.1] - 2026-06-16

### Fixed

- Ensure published packages rebuild library artifacts before packing so
  prerendering can resolve `dist/server.js`
- Exclude demo public assets from the library build output

## [1.3.0] - 2026-06-15

### Added

- Optional `url` field in `config/site.js`. When set, production builds emit a `sitemap.xml` for every prerendered route and inject per-page `<link rel="canonical">` and `og:url` tags (the canonical tag is no longer required in `index.html`)
- A `robots.txt` pointing at the sitemap is generated for root-deployed sites, unless one already exists in `public/`
- Per-page `excludeFromSitemap` flag to omit a route from the generated sitemap

### Notes

- Backward compatible — sites without `site.url` build exactly as before, with the sitemap and canonical injection skipped

## [1.2.0] - 2026-06-13

### Added

- Static site generation for all configured page routes during production builds
- Route-specific prerendered titles, descriptions, canonical URLs, Open Graph metadata, and Twitter metadata
- Client hydration for prerendered MDX pages and interactive React components

## [1.1.0] - 2026-06-12

### Changed

- README now opens with the project summary so the npm and GitHub package pages lead with a description of what MDX Docs does

## [1.0.0] - 2026-06-12

### Added

- Per-page SEO metadata support — pages can now define optional `title` and `description` fields in their config to override site-level defaults
- New `usePageMetadata` hook that updates the document title and meta description tag on initial load and on every client-side route change
- `title` falls back to `site.name` and `description` falls back to `site.description` when not set on a page
- The meta description tag is created automatically if it does not exist

### Notes

- Fully backward compatible — existing page configs without `title` or `description` continue to work unchanged

Example usage:

```js
{
  name: "My Page",
  route: "/my-page",
  component: MyPageMDX,
  title: "My Page — My Site",
  description: "Description of my page for search engines",
}
```

## [0.1.20] - 2026-04-15

### Added

- PostHog analytics integration

## [0.1.19] - 2026-04-15

### Added

- Google Analytics integration

## [0.1.18] - 2026-04-12

### Added

- Cloudflare Analytics integration
