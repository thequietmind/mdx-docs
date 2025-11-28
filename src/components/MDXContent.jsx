import { MDXProvider } from "@mdx-js/react";
import { Box, CircularProgress } from "@mui/material";
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import CodeBlock from "./CodeBlock";
import InlineCode from "./InlineCode";
import { pages } from "../config/pages";
import { getDefaultPage, isExternalLink } from "../utils/navigation";

const MDXContent = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 960,
        mx: "auto",
        pb: 4,
        // Add mobile-specific styles to prevent text overflow
        "& .MuiTypography-root": {
          wordWrap: "break-word",
          overflowWrap: "break-word",
        },
        "& pre": {
          wordWrap: "break-word",
          overflowWrap: "break-word",
          whiteSpace: "pre-wrap",
        },
        "& code": {
          wordWrap: "break-word",
          overflowWrap: "break-word",
        },
        "& p": {
          wordWrap: "break-word",
          overflowWrap: "break-word",
        },
        "& h1, & h2, & h3, & h4, & h5, & h6": {
          wordWrap: "break-word",
          overflowWrap: "break-word",
        },
        // Mobile-specific overrides
        "@media (max-width: 600px)": {
          maxWidth: "100%",
          px: 1,
          "& *": {
            wordWrap: "break-word",
            overflowWrap: "break-word",
          },
        },
        // Very small screen overrides
        "@media (max-width: 378px)": {
          maxWidth: "100%",
          px: 0.5,
          "& *": {
            wordWrap: "break-word",
            overflowWrap: "break-word",
          },
        },
      }}
    >
      <MDXProvider
        components={{
          pre: CodeBlock,
          code: (props) => {
            // Check if this is inline code (no className) vs fenced code block
            const isInline = !props.className;
            if (isInline) {
              return <InlineCode {...props} />;
            }
            // For fenced code blocks, use the CodeBlock component
            return <CodeBlock {...props} />;
          },
          a: (props) => {
            const isExternal = isExternalLink(props.href);
            return (
              <a
                {...props}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
              />
            );
          },
          p: (props) => {
            // Remove spacing for all paragraphs that contain React components
            const hasReactComponents =
              props.children &&
              (Array.isArray(props.children)
                ? props.children.some(
                    (child) => typeof child === "object" && child.type
                  )
                : typeof props.children === "object" && props.children.type);

            const isShortText =
              props.children &&
              typeof props.children === "string" &&
              props.children.length < 20;

            // Check if this looks like component content (text that might be from a Typography component)
            const isComponentContent =
              props.children &&
              typeof props.children === "string" &&
              (props.children.includes("Color Text") ||
                props.children.includes("Text"));

            // Always remove spacing for React components, short text, or component content
            const shouldRemoveSpacing =
              hasReactComponents || isShortText || isComponentContent;

            // If this paragraph contains a React component, render it directly without the p wrapper
            if (hasReactComponents) {
              return <>{props.children}</>;
            }

            // If this is component content (like Typography text), render without p wrapper
            if (isComponentContent) {
              return (
                <span style={{ margin: 0, padding: 0 }}>{props.children}</span>
              );
            }

            return (
              <p
                {...props}
                style={{
                  margin: shouldRemoveSpacing ? 0 : undefined,
                  padding: shouldRemoveSpacing ? 0 : undefined,
                }}
              />
            );
          },
        }}
      >
        <Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "200px",
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            {pages.map((page) => {
              const LazyComponent = page.component;
              return (
                <Route
                  key={page.route}
                  path={page.route}
                  element={<LazyComponent />}
                />
              );
            })}
            <Route
              path="*"
              element={React.createElement(getDefaultPage().component)}
            />
          </Routes>
        </Suspense>
      </MDXProvider>
    </Box>
  );
};

export default MDXContent;
