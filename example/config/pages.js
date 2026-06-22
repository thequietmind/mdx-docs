import { lazy } from "react";

const HomeMDX = lazy(() => import("@pages/home.mdx"));
const GettingStarted = lazy(() => import("@pages/getting-started.mdx"));
const ExamplesMDX = lazy(() => import("@pages/examples.mdx"));
const ComponentsMDX = lazy(() => import("@pages/components.mdx"));
const CustomizationMDX = lazy(() => import("@pages/customization.mdx"));
const AdvancedMDX = lazy(() => import("@pages/advanced.mdx"));
const Contributing = lazy(() => import("@pages/contributing.mdx"));

const AlertMDX = lazy(() => import("@pages/alert.mdx"));
const ButtonMDX = lazy(() => import("@pages/button.mdx"));
const CardMDX = lazy(() => import("@pages/card.mdx"));
const ChipMDX = lazy(() => import("@pages/chip.mdx"));
const ColorsMDX = lazy(() => import("@pages/colors.mdx"));
const LinksMDX = lazy(() => import("@pages/links.mdx"));
const TabsMDX = lazy(() => import("@pages/tabs.mdx"));
const TextFieldMDX = lazy(() => import("@pages/textfield.mdx"));
const TypographyMDX = lazy(() => import("@pages/typography.mdx"));

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
    name: "Examples",
    route: "/examples",
    component: ExamplesMDX,
    title: "Examples — MDX Docs",
    description: "Explore examples of Material-UI components in MDX Docs",
  },
  {
    name: "Components",
    route: "/components",
    component: ComponentsMDX,
    title: "Components — MDX Docs",
    description: "Reusable MDX components included with MDX Docs.",
  },
  {
    name: "Getting Started",
    route: "/getting-started",
    component: GettingStarted,
    title: "Getting Started — MDX Docs",
    description: "Install MDX Docs and create your first MDX documentation page",
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
    name: "Alert",
    route: "/alert",
    component: AlertMDX,
    isHidden: true,
  },
  {
    name: "Button",
    route: "/button",
    component: ButtonMDX,
    isHidden: true,
  },
  {
    name: "Card",
    route: "/card",
    component: CardMDX,
    isHidden: true,
  },
  {
    name: "Chip",
    route: "/chip",
    component: ChipMDX,
    isHidden: true,
  },
  {
    name: "Colors",
    route: "/colors",
    component: ColorsMDX,
    isHidden: true,
  },
  {
    name: "Links",
    route: "/links",
    component: LinksMDX,
    isHidden: true,
  },
  {
    name: "Tabs",
    route: "/tabs",
    component: TabsMDX,
    isHidden: true,
  },
  {
    name: "TextField",
    route: "/textfield",
    component: TextFieldMDX,
    isHidden: true,
  },
  {
    name: "Typography",
    route: "/typography",
    component: TypographyMDX,
    isHidden: true,
  },
];
