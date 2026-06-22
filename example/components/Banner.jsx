import { Alert, AlertTitle } from "@mui/material";

function Banner({ severity = "info", title, children }) {
  return (
    <Alert severity={severity} sx={{ my: 2 }}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </Alert>
  );
}

export default Banner;
