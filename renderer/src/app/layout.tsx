"use client";

import { ReactNode } from "react";
import { ChakraProvider, extendTheme, Flex } from "@chakra-ui/react";
import { fonts } from "@/app/fonts";
import theme from "@/lib/theme";
import MainTopMenu from "@/components/layout/MainTopMenu";
import { Footer } from "@/components/layout/Footer";

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
        <ChakraProvider theme={myTheme}>
          <Flex direction={"column"} gap={6}>
            <MainTopMenu />
            {children}
            <Footer />
          </Flex>
        </ChakraProvider>
      </body>
    </html>
  );
}
