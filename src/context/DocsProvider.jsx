import { createContext, useContext } from "react";

const DocsContext = createContext(null);

export const DocsProvider = ({ pages, site, hideHomeFromNav = false, children }) => (
  <DocsContext.Provider value={{ pages, site, hideHomeFromNav }}>
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
