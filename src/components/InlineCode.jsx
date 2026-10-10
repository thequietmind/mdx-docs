import { useTheme } from "@mui/material";
import { Highlight } from "prism-react-renderer";
import React from "react";

import { createPrismTheme, getCodePalette } from "./prismTheme";

const InlineCode = ({ children, ...props }) => {
  const palette = getCodePalette(useTheme());
  const code = typeof children === "string" ? children.trim() : "";

  const theme = createPrismTheme(palette.code, {
    color: palette.text.primary,
    backgroundColor: palette.code.inlineBackground,
  });

  return (
    <Highlight code={code} language="jsx" theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <code
          className={className}
          style={{
            ...style,
            padding: "2px 4px",
            borderRadius: "3px",
            fontSize: "0.875em",
            fontFamily: "monospace",
            display: "inline-block",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            maxWidth: "100%",
          }}
          {...props}
        >
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line, key: i });
            const { key: lineKey, ...restLineProps } = lineProps;
            return (
              <span key={lineKey} {...restLineProps}>
                {line.map((token, tokenIndex) => {
                  const tokenProps = getTokenProps({ token, key: tokenIndex });
                  const { key: _tokenKey, ...restTokenProps } = tokenProps;
                  return <span key={`${i}-${tokenIndex}`} {...restTokenProps} />;
                })}
              </span>
            );
          })}
        </code>
      )}
    </Highlight>
  );
};

export default InlineCode;
