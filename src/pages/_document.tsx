import { Html, Head, Main, NextScript } from 'next/document'

export function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="debug-screens">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
