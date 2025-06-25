import ButtonMDX from "../contents/button.mdx";
import ColorsMDX from "../contents/colors.mdx";
import HomeMDX from "../contents/home.mdx";
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
    name: "Button",
    route: "/button",
    component: ButtonMDX,
  },
  {
    name: "Colors",
    route: "/colors",
    component: ColorsMDX,
  },
  {
    name: "Typography",
    route: "/typography",
    component: TypographyMDX,
  },
];
