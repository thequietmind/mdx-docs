# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
