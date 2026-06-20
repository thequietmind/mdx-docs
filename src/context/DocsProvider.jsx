import { createContext, useContext } from "react";

const DocsContext = createContext(null);

const DEFAULT_FOOTER = { enabled: true, attribution: true };

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

export const useDocsContext = () => {
  const context = useContext(DocsContext);
  if (!context) {
    throw new Error("useDocsContext must be used within a DocsProvider");
  }
  return context;
};
