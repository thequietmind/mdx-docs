import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./main.css";

export function createApp({ pages, site, theme }) {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App pages={pages} site={site} theme={theme} />
    </StrictMode>
  );
}
