import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { lightBlue, purple, yellow } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: lightBlue[50],
      main: lightBlue[400],
    },
    secondary: {
      light: yellow[50],
      main: yellow[500],
    },
    warning: {
      main: yellow[700],
    },
  },
});

export const Theme = ({ children }: any) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
