import '../styles/globals.css'

import { deepPurple, cyan, red } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: deepPurple.A100 },
    secondary: cyan,
    status: {
      danger: red[500],
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
  <ThemeProvider theme={theme}>
    <ToastContainer position="bottom-right" />
    <Component {...pageProps} /> 
  </ThemeProvider>);
}

export default MyApp
