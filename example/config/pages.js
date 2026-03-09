import { lazy } from "react";

const HomeMDX = lazy(() => import("@pages/home.mdx"));
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
    name: "Home",
    route: "/",
    component: HomeMDX,
    isDefault: true,
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
