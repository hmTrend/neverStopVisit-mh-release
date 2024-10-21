import React from "react";
import Head from "next/head";
import { Container } from "../components/Container";

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-chakra-ui)</title>
      </Head>
      <Container minHeight="100vh"></Container>
    </React.Fragment>
  );
}
