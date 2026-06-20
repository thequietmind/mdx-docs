import { Typography } from "@mui/material";

function Lead({ children }) {
  return (
    <Typography
      component="p"
      sx={{
        mt: 1,
        mb: 3,
        color: "text.secondary",
        fontSize: { xs: "1.125rem", sm: "1.25rem" },
        lineHeight: 1.6,
      }}
    >
      {children}
    </Typography>
  );
}

export default Lead;
