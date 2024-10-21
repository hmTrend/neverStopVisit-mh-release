import React from 'react'
import Head from 'next/head'
import { Button } from '@chakra-ui/react'

import { Container } from '../components/Container'
import { Footer } from '../components/Footer'

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-chakra-ui)</title>
      </Head>
      <Container minHeight="100vh">
        <Footer>
          <Button
            href="/next"
            variant="solid"
            colorScheme="teal"
            rounded="button"
            width="full"
          >
            Go to next page
          </Button>
        </Footer>
      </Container>
    </React.Fragment>
  )
}
