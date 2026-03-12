import { lazy } from "react";

const HomeMDX = lazy(() => import("@pages/home.mdx"));
const ExamplesMDX = lazy(() => import("@pages/examples.mdx"));

const AlertMDX = lazy(() => import("@pages/alert.mdx"));
const ButtonMDX = lazy(() => import("@pages/button.mdx"));
const CardMDX = lazy(() => import("@pages/card.mdx"));
const ChipMDX = lazy(() => import("@pages/chip.mdx"));
const ColorsMDX = lazy(() => import("@pages/colors.mdx"));
const TabsMDX = lazy(() => import("@pages/tabs.mdx"));
const TextFieldMDX = lazy(() => import("@pages/textfield.mdx"));
const TypographyMDX = lazy(() => import("@pages/typography.mdx"));

export const pages = [
  {
    name: "MDX Docs",
    route: "/",
    component: HomeMDX,
  },
  {
    name: "Examples",
    route: "/examples",
    component: ExamplesMDX,
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
