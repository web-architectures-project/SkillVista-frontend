import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { wrapper } from '@/store/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default wrapper.withRedux(App)
