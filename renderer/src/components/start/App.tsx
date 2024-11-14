"use client";

import { Flex } from "@chakra-ui/react";
import { SelectProgramForStartLogic } from "@/components/start/SelectProgramForStartLogic";
import { StartButtonLogic } from "@/components/start/StartButtonLogic";
import { OptionCommon } from "@/components/start/OptionCommon";
import { commonStorage, nShoppingStorage } from "@/util/localStorage";
import { useEffect } from "react";

export const App = () => {
  useEffect(() => {
    // localStorage의 값을 valtio store에 동기화
    nShoppingStorage.syncToValtio();
    commonStorage.syncToValtio();
  }, []);

  return (
    <Flex direction={"column"} gap={9} p={5}>
      <OptionCommon />
      <SelectProgramForStartLogic />
      <StartButtonLogic />
    </Flex>
  );
};
