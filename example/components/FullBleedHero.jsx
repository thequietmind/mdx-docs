import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const isExternal = (href) => /^(https?:|mailto:|tel:)/.test(href ?? "");

const linkPropsFor = (action) =>
  isExternal(action.href)
    ? { href: action.href, target: "_blank", rel: "noopener noreferrer" }
    : { component: RouterLink, to: action.href };

// A hero that breaks out of the page's padded content column to span the full
// viewport width. The break-out is safe because the page's <main> element clips
// horizontal overflow. Pass any CSS `background` value; the default is a
// self-contained gradient. To use a photo instead, layer a dark scrim under it
// for text legibility, e.g.
//   background="linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url(/hero.jpg)"
function FullBleedHero({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  background = "linear-gradient(135deg, #1e3a8a 0%, #6d28d9 55%, #9333ea 100%)",
}) {
  return (
    <Box
      sx={{
        width: "100vw",
        ml: "calc(50% - 50vw)",
        mb: 6,
        px: 3,
        py: { xs: 8, md: 14 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "common.white",
        background,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="md" disableGutters>
        <Typography
          variant="h2"
          component="h1"
          sx={{ fontWeight: 800, mb: 2, textShadow: "0 2px 12px rgba(0,0,0,0.35)" }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="h6"
            component="p"
            sx={{
              fontWeight: 400,
              mb: 4,
              mx: "auto",
              maxWidth: 640,
              opacity: 0.95,
              textShadow: "0 1px 8px rgba(0,0,0,0.3)",
            }}
          >
            {subtitle}
          </Typography>
        )}
        {(primaryAction || secondaryAction) && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            {primaryAction && (
              <Button
                size="large"
                variant="contained"
                sx={{
                  bgcolor: "common.white",
                  color: "grey.900",
                  "&:hover": { bgcolor: "grey.100" },
                }}
                {...linkPropsFor(primaryAction)}
              >
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                size="large"
                variant="outlined"
                color="inherit"
                {...linkPropsFor(secondaryAction)}
              >
                {secondaryAction.label}
              </Button>
            )}
          </Stack>
        )}
      </Container>
    </Box>
  );
}

export default FullBleedHero;
