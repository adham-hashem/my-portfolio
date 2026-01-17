import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#512bd4" },
    secondary: { main: "#7c3aed" },
    background: { default: "#ffffff", paper: "#ffffff" },
    text: { primary: "#0f172a", secondary: "#475569" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: ["Poppins", "Roboto", "Arial", "sans-serif"].join(","),
  },
});

export default theme;
