import { useTheme } from "@mui/material";
import { Highlight } from "prism-react-renderer";
import React from "react";

const InlineCode = ({ children, ...props }) => {
  const muiTheme = useTheme();
  const code = typeof children === "string" ? children.trim() : "";

  // Create a simple theme for inline code
  const theme = {
    plain: {
      color: muiTheme.palette.text.primary,
      backgroundColor:
        muiTheme.palette.mode === "dark"
          ? "rgba(255,255,255,0.08)"
          : "rgba(0,0,0,0.08)",
    },
    styles: [
      {
        types: ["comment", "prolog", "doctype", "cdata"],
        style: {
          color: muiTheme.palette.mode === "dark" ? "#6a737d" : "#6a7781",
        },
      },
      {
        types: ["punctuation"],
        style: {
          color: muiTheme.palette.mode === "dark" ? "#e1e4e8" : "#24292e",
        },
      },
      {
        types: ["property", "tag", "boolean", "number", "constant", "symbol"],
        style: {
          color: muiTheme.palette.mode === "dark" ? "#79b8ff" : "#005cc5",
        },
      },
      {
        types: ["selector", "attr-name", "string", "char", "builtin"],
        style: {
          color: muiTheme.palette.mode === "dark" ? "#a5d6ff" : "#032f62",
        },
      },
      {
        types: ["operator", "entity", "url"],
        style: {
          color: muiTheme.palette.mode === "dark" ? "#d73a49" : "#d73a49",
        },
      },
      {
        types: ["atrule", "attr-value", "keyword"],
        style: {
          color: muiTheme.palette.mode === "dark" ? "#f97583" : "#d73a49",
        },
      },
      {
        types: ["function"],
        style: {
          color: muiTheme.palette.mode === "dark" ? "#b392f0" : "#6f42c1",
        },
      },
      {
        types: ["class-name"],
        style: {
          color: muiTheme.palette.mode === "dark" ? "#ffab70" : "#e36209",
        },
      },
    ],
  };

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
              <div key={lineKey} {...restLineProps}>
                {line.map((token, key) => {
                  const tokenProps = getTokenProps({ token, key });
                  const { key: tokenKey, ...restTokenProps } = tokenProps;
                  return <span key={tokenKey} {...restTokenProps} />;
                })}
              </div>
            );
          })}
        </code>
      )}
    </Highlight>
  );
};

export default InlineCode;
