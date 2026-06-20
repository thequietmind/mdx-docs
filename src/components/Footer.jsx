import { Box, Link, Typography } from "@mui/material";

import { useDocsContext } from "../context/DocsProvider";

function Footer() {
  const { footer } = useDocsContext();

  if (!footer?.enabled) {
    return null;
  }

  const content = footer.content ?? (
    <Typography variant="body2" color="text.secondary">
      Built with{" "}
      <Link href="https://mdxdocs.com" target="_blank" rel="noopener">
        MDX Docs
      </Link>
    </Typography>
  );

  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        py: 3,
        borderTop: 1,
        borderColor: "divider",
        textAlign: "center",
      }}
    >
      {content}
    </Box>
  );
}

export default Footer;
