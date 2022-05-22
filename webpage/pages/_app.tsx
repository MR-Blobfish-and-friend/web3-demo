import '../styles/globals.css'
import '../styles/reentrancy.css'
import '../styles/overflow.css'

import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
