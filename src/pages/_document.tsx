import { Html, Head, Main, NextScript } from 'next/document'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Header />
      <body className="debug-screens">
        <Main />
        <NextScript />
      </body>
      <Footer />
    </Html>
  )
}
