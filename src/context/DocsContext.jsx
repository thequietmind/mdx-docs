import { createContext, useContext } from "react";

const DocsContext = createContext(null);

export const DocsProvider = ({ pages, site, children }) => (
  <DocsContext.Provider value={{ pages, site }}>
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
