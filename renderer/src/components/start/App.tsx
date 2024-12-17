"use client";

import { Flex } from "@chakra-ui/react";
import { SelectProgramForStartLogic } from "@/components/start/SelectProgramForStartLogic";
import { StartButtonLogic } from "@/components/start/StartButtonLogic";
import { OptionCommon } from "@/components/start/OptionCommon";

export const App = () => {
  return (
    <Flex direction={"column"} gap={9} p={5}>
      <OptionCommon />
      <SelectProgramForStartLogic />
      <StartButtonLogic />
    </Flex>
  );
};
