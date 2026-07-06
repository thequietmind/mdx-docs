import { createContext, useContext } from "react";

export const ColorModeContext = createContext(null);

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
};
