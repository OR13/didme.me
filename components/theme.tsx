import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { indigo, purple, yellow } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      light: indigo[50],
      main: indigo[400],
    },
    secondary: {
      light: purple[50],
      main: purple[500],
    },
    warning: {
      main: yellow[700],
    },
  },
});

export const Theme = ({ children }: any) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
