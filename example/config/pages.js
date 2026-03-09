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
