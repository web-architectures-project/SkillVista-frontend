import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { wrapper } from "@/store/store";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

function App({ Component, ...rest }: AppProps) {
  const queryClient = new QueryClient();
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Header />
      <QueryClientProvider client={queryClient}>
        <Component {...props} />
      </QueryClientProvider>
      <Footer />
    </Provider>
  );
}

export default App
