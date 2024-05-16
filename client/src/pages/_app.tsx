import Layout from "@/layout/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";

export default function App({ Component, pageProps, router }: AppProps) {
  const getLayout = () => {
    if (router.pathname !== "/") {
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
    } else {
      return (
        <Component {...pageProps} />

      );
    }
  };

  return <div> <Toaster
  visibleToasts={7}
  closeButton={true}
  theme={"dark"}
  richColors={true}
/>{getLayout()}</div>;
}
