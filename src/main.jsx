import { pages } from "../example/config/pages.js";
import { site } from "../example/config/site.js";
import { createApp } from "./createApp.jsx";

createApp({
  pages,
  site,
  footer: {
    content: (
      <p>
        Made with{" "}
        <span role="img" aria-label="mindfulness" title="mindfulness">
          🧘
        </span>{" "}
        by{" "}
        <a
          href="https://quietmindcreative.com/"
          target="_blank"
          rel="noopener"
        >
          Quiet Mind Creative
        </a>
        .
      </p>
    ),
  },
});
