import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { useState } from "react";

function ColorSwatch({ color, variable, displayVariable }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(variable);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy variable:", err);
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        width: "100%",
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: 50,
          height: 50,
          backgroundColor: color,
          borderRadius: 1,
          border: "1px solid rgba(0,0,0,0.12)",
          flexShrink: 0,
        }}
      />
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          <strong>{displayVariable || variable}</strong>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          {color}
        </Typography>
      </Box>
      <Tooltip title={copied ? "Copied!" : "Copy variable name"}>
        <IconButton
          onClick={handleCopy}
          size="small"
          sx={{
            color: copied ? "success.main" : "text.secondary",
            flexShrink: 0,
            "&:hover": { color: copied ? "success.main" : "text.primary" },
          }}
        >
          {copied ? <CheckIcon /> : <ContentCopyIcon />}
        </IconButton>
      </Tooltip>
    </Paper>
  );
}

export default ColorSwatch;
