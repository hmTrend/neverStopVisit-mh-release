"use client";

import { Flex } from "@chakra-ui/react";
import { SelectProgramForStartLogic } from "@/components/start/SelectProgramForStartLogic";
import { StartButtonLogic } from "@/components/start/StartButtonLogic";
import { useEffect } from "react";
import { storeStart } from "@/valtio/start.valtio";
import { useSnapshot } from "valtio/react";
import { storeOption } from "@/valtio/option.valtio";

export const App = () => {
  const snapOption = useSnapshot(storeOption);
  useEffect(() => {
    storeStart.option = snapOption;
  }, []);

  return (
    <Flex direction={"column"} gap={9} p={5}>
      <SelectProgramForStartLogic />
      <StartButtonLogic />
    </Flex>
  );
};
