import { Box, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const isExternal = (href) => /^(https?:|mailto:|tel:)/.test(href ?? "");

function renderAction(action, variant) {
  if (!action) {
    return null;
  }

  const linkProps = isExternal(action.href)
    ? { href: action.href, target: "_blank", rel: "noopener noreferrer" }
    : { component: RouterLink, to: action.href };

  return (
    <Button variant={variant} {...linkProps}>
      {action.label}
    </Button>
  );
}

function Hero({ title, subtitle, primaryAction, secondaryAction }) {
  return (
    <Box sx={{ my: 4, py: { xs: 3, sm: 5 }, borderBottom: 1, borderColor: "divider" }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1.5 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="h6"
          component="p"
          sx={{ color: "text.secondary", fontWeight: 400, mb: 3, maxWidth: 640 }}
        >
          {subtitle}
        </Typography>
      )}
      {(primaryAction || secondaryAction) && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
          {renderAction(primaryAction, "contained")}
          {renderAction(secondaryAction, "outlined")}
        </Box>
      )}
    </Box>
  );
}

export default Hero;
