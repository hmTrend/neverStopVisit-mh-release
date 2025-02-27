import { Flex } from "@chakra-ui/react";
import { useLoggingIpcData } from "@/hook/logging/useLoggingIpcData";

export function AppLogging() {
  const { loggingData } = useLoggingIpcData();

  return <Flex>this si logging2</Flex>;
}
