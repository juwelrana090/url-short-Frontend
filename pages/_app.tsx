import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import NextNProgress from "nextjs-progressbar";
function MyApp({ Component, pageProps, }: AppProps) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
        <NextNProgress
          color="#ab05f8"
          startPosition={0.3}
          stopDelayMs={300}
          height={3}
          showOnShallow={true}
        />
        <Component {...pageProps} />
      </ThemeProvider>
  );
}

export default MyApp;
