# MDX Docs

A modern React + Vite application for creating beautiful documentation sites using MDX (Markdown + JSX). Perfect for component libraries, design systems, and technical documentation.

## 🌟 Features

- **MDX Support**: Write documentation using Markdown with embedded React components
- **Syntax Highlighting**: Powered by Prism React Renderer for beautiful code blocks
- **Copy to Clipboard**: One-click copying for code blocks and color values
- **Dark/Light Theme**: Built-in theme switching with Material-UI
- **Responsive Design**: Mobile-first responsive navigation and layout
- **Material-UI Integration**: Comprehensive component library and theming
- **GitHub Pages Ready**: Configured for easy deployment to GitHub Pages
- **Test Coverage**: Comprehensive test suite with Vitest and Testing Library
- **Modern Tooling**: ESLint, Vite, and modern React patterns

## 📚 Tech Stack

- **Frontend**: React 19, Material-UI 7, Emotion
- **Build Tool**: Vite 6
- **Routing**: React Router DOM 7
- **Documentation**: MDX 3
- **Testing**: Vitest, Testing Library
- **Deployment**: GitHub Pages

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- Yarn package manager

### Installation

Clone the repository:

```sh
git clone https://github.com/thequietmind/mdx-docs.git
cd mdx-docs
```

Install dependencies:

```sh
yarn
```

Start the development server:

```sh
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Build for production |
| `yarn preview` | Preview production build locally |
| `yarn serve` | Preview production build with network access |
| `yarn lint` | Run ESLint |
| `yarn test` | Run tests |
| `yarn test:watch` | Run tests in watch mode |
| `yarn test:coverage` | Run tests with coverage |
| `yarn test:ui` | Run tests with UI |
| `yarn deploy` | Deploy to GitHub Pages |

## 📖 Documentation Structure

### Adding New Pages

Create a new MDX file in `src/contents/`:

```mdx
# My New Page

This is my new documentation page with **markdown** and React components.
```

Update the pages configuration in `src/config/pages.js`:

```js
import MyNewPageMDX from "../contents/my-new-page.mdx";

export const pages = [
  // ... existing pages
  {
    name: "My New Page",
    route: "/my-new-page",
    component: MyNewPageMDX,
  },
];
```

### MDX Features

- **Code Blocks**: Syntax highlighting with copy buttons
- **Inline Code**: Styled inline code snippets
- **React Components**: Embed any React component directly in MDX
- **External Links**: Automatically open in new tabs

## 🎨 Theming

### Customizing Colors

Update the theme files to customize the appearance:

- **Light Theme**: `src/themes/lightTheme.js`
- **Dark Theme**: `src/themes/darkTheme.js`

Example theme customization:

```js
export const lightTheme = {
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
};
```

### Theme Hook

Use the `useTheme` hook to access theme state:

```js
import { useTheme } from './hooks/useTheme';

function MyComponent() {
  const { darkMode, setDarkMode } = useTheme();
  // ...
}
```

## 🏗️ Project Structure

```none
src/
├── components/          # React components
│   ├── AppBar.jsx      # Top navigation bar
│   ├── CodeBlock.jsx   # Syntax highlighted code blocks
│   ├── InlineCode.jsx  # Inline code styling
│   ├── MDXContent.jsx  # MDX content renderer
│   └── SideNavigation.jsx # Sidebar navigation
├── config/
│   └── pages.js        # Page configuration
├── contents/           # MDX documentation files
│   ├── button.mdx
│   ├── colors.mdx
│   ├── home.mdx
│   └── typography.mdx
├── hooks/
│   └── useTheme.js     # Theme management hook
├── themes/             # Material-UI themes
│   ├── darkTheme.js
│   ├── lightTheme.js
│   └── index.js
└── utils/
    └── navigation.js   # Navigation utilities
```

## 🧪 Testing

The project includes comprehensive tests with good coverage thresholds:

- **Unit Tests**: Component and utility testing
- **Coverage**: 70% minimum for branches, functions, lines, and statements
- **Tools**: Vitest, Testing Library, jsdom

Run tests:

```sh
# Run all tests
yarn test

# Watch mode
yarn test:watch

# With coverage
yarn test:coverage

# Interactive UI
yarn test:ui
```

## 🚀 Deployment

### GitHub Pages

The project is configured for GitHub Pages deployment:

1. Update the `homepage` field in `package.json`
2. Run the deploy command:

```sh
yarn deploy
```

### Production Serving

To serve the app in production mode locally:

#### Option 1: Using Vite Preview (Recommended)

```sh
yarn build
yarn preview
```

This serves the production build at `http://localhost:4173` (or another port if 4173 is taken).

#### Option 2: Using Vite Preview with Network Access

```sh
yarn build
yarn serve
```

This serves the production build and makes it accessible on your local network.

#### Option 3: Using a Static File Server

Install a static server globally:

```sh
npm install -g serve
# or
yarn global add serve
```

Then build and serve:

```sh
yarn build
serve -s dist -l 3000
```

### Custom Deployment

For other hosting platforms (Netlify, Vercel, AWS S3, etc.), build the project and serve the `dist` folder:

```sh
yarn build
# Upload the dist/ directory to your hosting platform
```

## 🔧 Configuration

### Vite Configuration

The Vite config (`vite.config.js`) includes:

- MDX plugin configuration
- Emotion JSX runtime
- Dynamic base URL for GitHub Pages

### ESLint

ESLint is configured with:

- React and React Hooks rules
- Import organization
- Modern JavaScript standards

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [MDX](https://mdxjs.com/) for the amazing documentation framework
- [Material-UI](https://mui.com/) for the beautiful component library
- [Vite](https://vitejs.dev/) for the lightning-fast build tool
- [Prism React Renderer](https://github.com/FormidableLabs/prism-react-renderer) for syntax highlighting
