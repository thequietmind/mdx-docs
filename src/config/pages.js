import AlertMDX from "../contents/alert.mdx";
import ButtonMDX from "../contents/button.mdx";
import CardMDX from "../contents/card.mdx";
import ChipMDX from "../contents/chip.mdx";
import ColorsMDX from "../contents/colors.mdx";
import HomeMDX from "../contents/home.mdx";
import TabsMDX from "../contents/tabs.mdx";
import TextFieldMDX from "../contents/textfield.mdx";
import TypographyMDX from "../contents/typography.mdx";

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
