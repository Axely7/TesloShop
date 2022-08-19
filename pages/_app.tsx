import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/system";
import { lightTheme } from "../themes";
import { CssBaseline } from "@mui/material";
import { SWRConfig } from "swr";
import { UIProvider } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <UIProvider>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </SWRConfig>
  );
}

export default MyApp;
