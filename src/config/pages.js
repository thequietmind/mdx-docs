import { lazy } from "react";

// Lazy load all MDX pages for code splitting
// This reduces initial bundle size significantly
const AlertMDX = lazy(() => import("../contents/alert.mdx"));
const ButtonMDX = lazy(() => import("../contents/button.mdx"));
const CardMDX = lazy(() => import("../contents/card.mdx"));
const ChipMDX = lazy(() => import("../contents/chip.mdx"));
const ColorsMDX = lazy(() => import("../contents/colors.mdx"));
const HomeMDX = lazy(() => import("../contents/home.mdx"));
const TabsMDX = lazy(() => import("../contents/tabs.mdx"));
const TextFieldMDX = lazy(() => import("../contents/textfield.mdx"));
const TypographyMDX = lazy(() => import("../contents/typography.mdx"));

// Centralized pages configuration
// This controls both navigation and routing
export const pages = [
  {
    name: "Home",
    route: "/",
    component: HomeMDX,
    isDefault: true, // This will be used for the catch-all route
  },
  {
    name: "Alert",
    route: "/alert",
    component: AlertMDX,
  },
  {
    name: "Button",
    route: "/button",
    component: ButtonMDX,
  },
  {
    name: "Card",
    route: "/card",
    component: CardMDX,
  },
  {
    name: "Chip",
    route: "/chip",
    component: ChipMDX,
  },
  {
    name: "Colors",
    route: "/colors",
    component: ColorsMDX,
  },
  {
    name: "Tabs",
    route: "/tabs",
    component: TabsMDX,
  },
  {
    name: "TextField",
    route: "/textfield",
    component: TextFieldMDX,
  },
  {
    name: "Typography",
    route: "/typography",
    component: TypographyMDX,
  },
];
