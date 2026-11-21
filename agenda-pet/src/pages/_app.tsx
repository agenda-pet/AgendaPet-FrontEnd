import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Quicksand } from "next/font/google";
import { ToastContainer } from "react-toastify";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={quicksand.variable}>
      <ToastContainer/>
      <Component {...pageProps} />
    </main>
  )
}
