import { Box, Typography, useTheme } from "@mui/material";

import ColorSwatch from "./ColorSwatch.jsx";

const colorGroups = [
  { name: "Primary", path: "primary", keys: ["light", "main", "dark", "contrastText"] },
  { name: "Secondary", path: "secondary", keys: ["light", "main", "dark", "contrastText"] },
  { name: "Background", path: "background", keys: ["default", "paper"] },
  { name: "Text", path: "text", keys: ["primary", "secondary", "disabled"] },
  { name: "Error", path: "error", keys: ["light", "main", "dark", "contrastText"] },
  { name: "Warning", path: "warning", keys: ["light", "main", "dark", "contrastText"] },
  { name: "Info", path: "info", keys: ["light", "main", "dark", "contrastText"] },
  { name: "Success", path: "success", keys: ["light", "main", "dark", "contrastText"] },
];

const gridStyle = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
  gap: 2,
  mb: 3,
};

function ThemeColors() {
  const theme = useTheme();

  return (
    <Box>
      {colorGroups.map((group) => (
        <Box key={group.name}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {group.name}
          </Typography>
          <Box sx={gridStyle}>
            {group.keys.map((key) => (
              <ColorSwatch
                key={key}
                color={theme.palette[group.path][key]}
                variable={`theme.palette.${group.path}.${key}`}
                displayVariable={`palette.${group.path}.${key}`}
              />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default ThemeColors;
