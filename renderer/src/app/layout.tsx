"use client";

import { ReactNode } from "react";
import { ChakraProvider, extendTheme, Flex } from "@chakra-ui/react";
import { fonts } from "@/app/fonts";
import theme from "@/lib/theme";
import MainTopMenu from "@/components/layout/MainTopMenu";
import { Footer } from "@/components/layout/Footer";
import { client } from "@/lib/graphql/apollo-provider";
import { ApolloProvider } from "@apollo/client";
import { WithLoginCheck } from "@/components/layout/WithLoginCheck";

const proTheme = extendTheme(theme);
const extenstion = {
  colors: { ...proTheme.colors, brand: proTheme.colors.teal },
};
const myTheme = extendTheme(extenstion, proTheme);

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" className={fonts.rubik.variable}>
      <body>
        <ApolloProvider client={client}>
          <ChakraProvider theme={myTheme}>
            <Flex direction={"column"} gap={6}>
              <MainTopMenu />
              <WithLoginCheck>{children}</WithLoginCheck>
              <Footer />
            </Flex>
          </ChakraProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
