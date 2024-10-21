import React from "react";
import Head from "next/head";
import { Container } from "../components/Container";

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>네버스탑 비지트히트</title>
      </Head>
      <Container minHeight="100vh"></Container>
    </React.Fragment>
  );
}
