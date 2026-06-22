import { lazy } from "react";

const HomeMDX = lazy(() => import("@pages/home.mdx"));
const GettingStarted = lazy(() => import("@pages/getting-started.mdx"));
const ExamplesMDX = lazy(() => import("@pages/examples.mdx"));
const CustomizationMDX = lazy(() => import("@pages/customization.mdx"));
const AdvancedMDX = lazy(() => import("@pages/advanced.mdx"));
const Contributing = lazy(() => import("@pages/contributing.mdx"));

const DesignSystemMDX = lazy(() => import("@pages/design-system.mdx"));
const ComponentsMDX = lazy(() => import("@pages/components.mdx"));
const FullWidthMDX = lazy(() => import("@pages/full-width.mdx"));

export const pages = [
  {
    name: "MDX Docs",
    route: "/",
    component: HomeMDX,
    title: "MDX Docs — MDX-powered documentation",
    description:
      "Create beautiful, interactive documentation sites with MDX and React",
  },
  {
    name: "Getting Started",
    route: "/getting-started",
    component: GettingStarted,
    title: "Getting Started — MDX Docs",
    description: "Install MDX Docs and create your first MDX documentation page",
  },
  {
    name: "Examples",
    route: "/examples",
    component: ExamplesMDX,
    title: "Examples — MDX Docs",
    description:
      "Real documentation patterns built with MDX, React, and Material UI",
  },
  {
    name: "Customization",
    route: "/customization",
    component: CustomizationMDX,
    title: "Customization — MDX Docs",
    description: "Learn how to customize the theme and styling of MDX Docs",
  },
  {
    name: "Advanced",
    route: "/advanced",
    component: AdvancedMDX,
    title: "Advanced — MDX Docs",
    description: "Dive deeper into advanced features and customization options",
  },
  {
    name: "Contributing",
    route: "/contributing",
    component: Contributing,
    title: "Contributing — MDX Docs",
    description: "Dive deeper into advanced features and customization options",
  },
  {
    name: "Design System",
    route: "/design-system",
    component: DesignSystemMDX,
    title: "Design System & Theme — MDX Docs",
    description: "Document your color tokens and type scale from your live theme",
    isHidden: true,
  },
  {
    name: "Documentation Components",
    route: "/components",
    component: ComponentsMDX,
    title: "Documentation Components — MDX Docs",
    description: "Reusable documentation components with copy-paste source",
    isHidden: true,
  },
  {
    name: "Full Width",
    route: "/full-width",
    component: FullWidthMDX,
    title: "Full Width — MDX Docs",
    description: "Example page with the docs sidebar hidden via frontmatter.",
    isHidden: true,
  },
];
