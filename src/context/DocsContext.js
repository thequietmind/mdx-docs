import { createContext, useContext } from "react";

export const DocsContext = createContext(null);

export const useDocsContext = () => {
  const context = useContext(DocsContext);
  if (!context) {
    throw new Error("useDocsContext must be used within a DocsProvider");
  }
  return context;
};
