import '../styles/globals.css';

import { green, blue, lightBlue } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: blue,
    secondary: green
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
