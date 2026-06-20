import { DocsContext } from "./DocsContext";

const DEFAULT_FOOTER = { enabled: true };

export const DocsProvider = ({
  pages,
  site,
  hideHomeFromNav = false,
  footer,
  children,
}) => (
  <DocsContext.Provider
    value={{
      pages,
      site,
      hideHomeFromNav,
      footer: { ...DEFAULT_FOOTER, ...footer },
    }}
  >
    {children}
  </DocsContext.Provider>
);
