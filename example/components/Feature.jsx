import { Box, Card, CardContent, Typography } from "@mui/material";

function Feature({ title, description, icon }) {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        {icon && (
          <Box
            sx={{
              color: "primary.main",
              mb: 1,
              display: "flex",
              "& svg": { fontSize: 32 },
            }}
          >
            {icon}
          </Box>
        )}
        <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Feature;
