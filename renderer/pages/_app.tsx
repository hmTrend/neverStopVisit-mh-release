import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import {theme} from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  const proTheme = extendTheme(theme);
  const extention = {
    colors: { ...proTheme.colors },
    fonts: {
      heading: "'Inter Variable', -apple-system, system-ui, sans-serif",
      body: "'Inter Variable', -apple-system, system-ui, sans-serif",
    },
  };
  const myTheme = extendTheme(extention, proTheme);

  
  return (
    <ChakraProvider theme={myTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
