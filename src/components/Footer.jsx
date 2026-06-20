import { Box, Link, Typography } from "@mui/material";

import { useDocsContext } from "../context/DocsProvider";

function Footer() {
  const { footer } = useDocsContext();

  if (!footer?.enabled || !footer?.attribution) {
    return null;
  }

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
      <Typography variant="body2" color="text.secondary">
        Built with{" "}
        <Link
          href="https://mdxdocs.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          MDX Docs
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
