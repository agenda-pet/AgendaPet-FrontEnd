import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  variable: "--fonte-padrao",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={quicksand.variable}>
      <Component {...pageProps} />
    </main>
  )
}
