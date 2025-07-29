import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { Highlight } from "prism-react-renderer";
import React, { useState } from "react";

const CodeBlock = ({ children, className = "", ...props }) => {
  const [copied, setCopied] = useState(false);
  const muiTheme = useTheme();

  // Extract language from className
  const language = className.replace("language-", "") || "jsx";

  // Extract code content from children
  let code = "";
  if (typeof children === "string") {
    code = children.trim();
  } else if (children && typeof children === "object" && children.props) {
    // Handle React element children
    if (typeof children.props.children === "string") {
      code = children.props.children.trim();
    } else if (Array.isArray(children.props.children)) {
      code = children.props.children.join("").trim();
    }
  }

  // Create a simple theme that adapts to Material UI theme
  const theme = {
    plain: {
      color: muiTheme.palette.text.primary,
      backgroundColor: muiTheme.palette.background.paper,
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback or error
    }
  };

  return (
    <Box sx={{ position: "relative", my: 2 }}>
      <Box sx={{ position: "absolute", top: 4, right: 4, zIndex: 1 }}>
        <Tooltip title={copied ? "Copied!" : "Copy"}>
          <IconButton
            size="small"
            onClick={handleCopy}
            color="inherit"
            sx={{ width: 24, height: 24 }}
          >
            {copied ? (
              <CheckIcon sx={{ fontSize: 16 }} />
            ) : (
              <ContentCopyIcon sx={{ fontSize: 16 }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Highlight code={code} language={language} theme={theme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Box
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
              overflow: "hidden",
              backgroundColor: muiTheme.palette.background.paper,
              boxShadow: 1,
            }}
          >
            {/* Language indicator */}
            <Box
              sx={{
                px: 2,
                py: 1,
                backgroundColor:
                  muiTheme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.04)",
                borderBottom: 1,
                borderColor: "divider",
                fontSize: "0.75rem",
                color: muiTheme.palette.text.secondary,
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {language}
            </Box>
            <pre
              className={className}
              style={{
                ...style,
                margin: 0,
                padding: 16,
                overflowX: "auto",
                backgroundColor: "transparent",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
              }}
              {...props}
            >
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i });
                const { key: lineKey, ...restLineProps } = lineProps;
                return (
                  <div key={lineKey} {...restLineProps}>
                    {line.map((token, tokenIndex) => {
                      const tokenProps = getTokenProps({ token, key: tokenIndex });
                      const { key: tokenKey, ...restTokenProps } = tokenProps;
                      return <span key={`${i}-${tokenIndex}`} {...restTokenProps} />;
                    })}
                  </div>
                );
              })}
            </pre>
          </Box>
        )}
      </Highlight>
    </Box>
  );
};

export default CodeBlock;
