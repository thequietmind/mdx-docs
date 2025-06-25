# MDX Docs

A simple React + Vite app that displays MDX documents.

This is a perfect solution for documentation of a UI component library, or other types of documentation.

This app uses Material UI as its UI component library, and for demo purposes it starts out by showing what documentation pages might look like for the `Button` and `Typography` components.

## Features

- Fenced code blocks and inline code blocks both support syntax highlighting.
- Fenced code blocks feature copy buttons. There's also an example of displaying a color palette with copy buttons in `src/contents/colors.mdx`.
- External links in MDX files open in a new tab/window.

## Installing dependencies

To install the project dependencies:

```sh
yarn
```

## Commands

To run the project:

```sh
yarn dev
```

To build the project:

```sh
yarn build
```

To preview the built project:

```sh
yarn preview
```

## Managing pages

To configure pages, update the config in `src/config/pages.js`.

## Color Theme

To adjust the color theme, you can update the colors of the Material UI color palette.

- Light mode: `src/theme/lightTheme.js`
- Dark mode: `src/theme/darkTheme.js`
