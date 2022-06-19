import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Theme } from "../components/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <Component {...pageProps} />

      <ToastContainer />
    </Theme>
  );
}
export default MyApp;
