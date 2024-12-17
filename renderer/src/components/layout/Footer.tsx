import { Flex, Text } from "@chakra-ui/react";
import packageList from "../../../../package.json";

export const Footer = () => {
  return (
    <Flex mx={6}>
      <Text fontSize={"sm"}>v{packageList.version}</Text>
    </Flex>
  );
};
