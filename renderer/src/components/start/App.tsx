"use client";

import { Flex } from "@chakra-ui/react";
import { SelectProgramForStartLogic } from "@/components/start/SelectProgramForStartLogic";
import { StartButtonLogic } from "@/components/start/StartButtonLogic";
import { OptionCommon } from "@/components/start/OptionCommon";
import { WorkCompletedList } from "@/components/start/WorkCompletedList";
import { IpChangeCount } from "@/components/start/IpChangeCount";
import { AppLogging } from "@/components/logging/AppLogging";

export const App = () => {
  return (
    <Flex direction={"column"} gap={9} p={5}>
      <OptionCommon />
      <IpChangeCount />
      <SelectProgramForStartLogic />
      <StartButtonLogic />
      <AppLogging />
      <WorkCompletedList />
    </Flex>
  );
};
