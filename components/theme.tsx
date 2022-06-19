import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { blue, yellow } from "@mui/material/colors";

export const colors = { primary: blue[500], secondary: yellow[500] };

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: blue[50],
      main: blue[500],
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
