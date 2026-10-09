import { DocsContext } from "./DocsContext";

const DEFAULT_FOOTER = { enabled: true };
const DEFAULT_CODE_BLOCKS = { titleBar: false };

export const DocsProvider = ({
  pages,
  site,
  hideHomeFromNav = false,
  footer,
  codeBlocks,
  children,
}) => (
  <DocsContext.Provider
    value={{
      pages,
      site,
      hideHomeFromNav,
      footer: { ...DEFAULT_FOOTER, ...footer },
      codeBlocks: { ...DEFAULT_CODE_BLOCKS, ...codeBlocks },
    }}
  >
    {children}
  </DocsContext.Provider>
);
