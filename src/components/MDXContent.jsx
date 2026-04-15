import { MDXProvider } from "@mdx-js/react";
import {
  Box,
  CircularProgress,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import CodeBlock from "./CodeBlock";
import InlineCode from "./InlineCode";
import NotFound from "virtual:mdx-docs/404";
import { useDocsContext } from "../context/DocsProvider";
import { isExternalLink } from "../utils/navigation";

const MDXContent = () => {
  const { pages } = useDocsContext();

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
          // pre: CodeBlock,
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
              <Link
                {...props}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
              />
            );
          },
          blockquote: (props) => (
            <Box
              component="blockquote"
              sx={{
                borderLeft: "4px solid",
                borderColor: "primary.main",
                pl: 2,
                py: 0.5,
                my: 2,
                mx: 0,
                color: "text.secondary",
                fontStyle: "italic",
                bgcolor: "action.hover",
                borderRadius: "0 4px 4px 0",
              }}
              {...props}
            />
          ),
          table: (props) => (
            <TableContainer component={Paper} variant="outlined" sx={{ my: 2 }}>
              <Table size="small" {...props} />
            </TableContainer>
          ),
          thead: TableHead,
          tbody: TableBody,
          tr: TableRow,
          th: (props) => <TableCell component="th" {...props} />,
          td: TableCell,
          p: (props) => {
            // Remove spacing for all paragraphs that contain React components
            const hasReactComponents =
              props.children &&
              (Array.isArray(props.children)
                ? props.children.some(
                    (child) => typeof child === "object" && child.type
                  )
                : typeof props.children === "object" && props.children.type);

            // If this paragraph contains a React component, render it directly without the p wrapper
            if (hasReactComponents) {
              return <>{props.children}</>;
            }

            return <p {...props} />;
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MDXProvider>
    </Box>
  );
};

export default MDXContent;
