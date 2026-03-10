# @quietmind/mdx-docs

A React + Vite framework for building MDX-powered documentation sites. Write pages in Markdown with embedded React components, and get a fully-featured site with syntax highlighting, dark/light mode, and responsive navigation out of the box.

**Demo:** https://mdxdocs.com/

## Features

- MDX pages — write Markdown with embedded React components
- Syntax highlighting with copy-to-clipboard on code blocks
- Dark/light mode with system preference detection
- Responsive sidebar navigation
- Built on React 19, Material-UI 7, and Vite 6

## Installation

```sh
npm install @quietmind/mdx-docs
```

### Peer dependencies

```sh
npm install react react-dom react-router-dom \
  @emotion/react @emotion/styled \
  @mui/material @mui/icons-material \
  @mdx-js/react @mdx-js/rollup \
  prism-react-renderer prismjs \
  vite @vitejs/plugin-react
```

## Quick Start

### 1. Site structure

```
my-site/
├── pages/
│   └── home.mdx
├── config/
│   ├── pages.js
│   └── site.js
├── public/
│   └── favicon.svg
├── index.html
├── main.jsx
├── vite.config.js
└── package.json
```

### 2. `config/site.js`

```js
export const site = {
  name: "My Site",
  description: "My site description",
};
```

### 3. `config/pages.js`

```js
import { lazy } from "react";

const HomeMDX = lazy(() => import("@pages/home.mdx"));

export const pages = [
  {
    name: "Home",
    route: "/",
    component: HomeMDX,
    isDefault: true,
  },
];
```

### 4. `main.jsx`

```js
import "@quietmind/mdx-docs/index.css";
import { createApp } from "@quietmind/mdx-docs";
import { pages } from "./config/pages.js";
import { site } from "./config/site.js";

createApp({ pages, site });
```

### 5. `vite.config.js`

```js
import { defineConfig } from "vite";
import { createMdxDocsConfig } from "@quietmind/mdx-docs/vite";
import { site } from "./config/site.js";

export default defineConfig(
  createMdxDocsConfig({ rootDir: import.meta.dirname, site })
);
```

### 6. `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="%SITE_DESCRIPTION%" />
    <title>%SITE_NAME%</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.jsx"></script>
  </body>
</html>
```

## Adding Pages

Create an MDX file in `pages/`:

~~~mdx
# Getting Started

This is a documentation page with **markdown** and React components.

```js
const hello = "world";
```
~~~

Register it in `config/pages.js`:

```js
const GettingStartedMDX = lazy(() => import("@pages/getting-started.mdx"));

export const pages = [
  // ...existing pages
  {
    name: "Getting Started",
    route: "/getting-started",
    component: GettingStartedMDX,
  },
];
```

Pages without `isDefault: true` appear in the sidebar navigation. The page with `isDefault: true` is the fallback/home route.

## Favicon

Place your favicon in the `public/` directory and add a `<link>` tag to `index.html`:

```html
<head>
  <!-- ... -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</head>
```

Vite serves files in `public/` at the root path, so `public/favicon.svg` is accessible as `/favicon.svg`. Use `.ico`, `.png`, or `.svg` depending on your file.

## Tech Stack

- React 19, Material-UI 7, Emotion
- Vite 6, MDX 3
- React Router DOM 7
- Prism React Renderer

## License

MIT
