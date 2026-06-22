import { Box, Card, CardContent, Typography } from "@mui/material";

function Feature({ title, description, icon }) {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          {icon && (
            <Box
              sx={{
                color: "primary.main",
                display: "flex",
                "& svg": { fontSize: 28 },
              }}
            >
              {icon}
            </Box>
          )}
          <Typography variant="h6" component="h3">
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Feature;
