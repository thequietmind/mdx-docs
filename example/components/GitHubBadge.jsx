import { useTheme } from "@mui/material";

function GitHubBadge({ href, src, lightSrc }) {
  const { palette } = useTheme();
  const badgeSrc = palette.mode === "light" && lightSrc ? lightSrc : src;

  return (
    <p>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <img src={badgeSrc} alt="GitHub" height="20" />
      </a>
    </p>
  );
}

export default GitHubBadge;
