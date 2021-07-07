import { createMuiTheme } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      // main: "#2979ff",
      // main: "#15264f",
      main: "#1c54b2",

      // light: "#0176ff",
    },
    secondary: {
      main: "#dc004e",
    },
    success: {
      main: "#4caf50",
      dark: "#388e3c",
    },
    action: {
      // disabled: "rgba(255, 255, 255, 0.3)",
    },
    grey: {
      A400: "#3c3737",
    },
  },
  status: {
    danger: "orange",
  },
  typography: {
    fontFamily: [
      "Quicksand",
      "Rubik",
      "Sacramento",
      "Sansita Swashed",
      "Sigmar One",
      "Parisienne",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  overrides: {
    MuiInputLabel: {
      root: {
        background: defaultTheme.palette.type === "light" ? "#fff" : "#424242",
        zIndex: 999,
      },
    },
  },
});

export default theme;
