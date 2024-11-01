import { Flex, Text } from "@chakra-ui/react";
import { version } from "../../../../package.json";

export const Footer = () => {
  return (
    <Flex mx={6}>
      <Text fontSize={"sm"}>v{version}</Text>
    </Flex>
  );
};
