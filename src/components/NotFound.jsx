import { Box, Typography, Link } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        gap: 2,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "6rem", fontWeight: 700, lineHeight: 1 }}>
        404
      </Typography>
      <Typography variant="h5" color="text.secondary">
        Page not found
      </Typography>
      <Link href="/" underline="hover">
        Go home
      </Link>
    </Box>
  );
};

export default NotFound;
