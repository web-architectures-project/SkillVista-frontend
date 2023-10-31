import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { wrapper } from "@/store/store";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <>
      <Header />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
      <Footer />
    </>
  );
}

export default wrapper.withRedux(App);
