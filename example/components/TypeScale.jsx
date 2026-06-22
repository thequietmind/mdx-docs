import { Box, Paper, Typography, useTheme } from "@mui/material";

const typeTokens = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "subtitle1",
  "subtitle2",
  "body1",
  "body2",
  "button",
  "caption",
  "overline",
];

function TypeScale() {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, my: 3 }}>
      {typeTokens.map((variant) => {
        const token = theme.typography[variant] || {};
        return (
          <Paper
            key={variant}
            variant="outlined"
            sx={{
              p: 2,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { sm: "baseline" },
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography variant={variant} sx={{ m: 0 }}>
              {variant}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ flexShrink: 0, fontFamily: "monospace" }}
            >
              typography.{variant} · {token.fontSize || "—"} / {token.fontWeight || "—"}
            </Typography>
          </Paper>
        );
      })}
    </Box>
  );
}

export default TypeScale;
