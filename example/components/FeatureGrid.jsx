import { Box } from "@mui/material";

function FeatureGrid({ children }) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
        my: 3,
      }}
    >
      {children}
    </Box>
  );
}

export default FeatureGrid;
