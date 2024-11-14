"use client";

import { StartButton } from "@/components/start/StartButton";
import { useSnapshot } from "valtio/react";
import { storeStart } from "@/valtio/start.valtio";
import { useToast } from "@chakra-ui/react";

export const StartButtonLogic = () => {
  const snapStart = useSnapshot(storeStart);
  const toast = useToast();

  const handleStartProgram = async () => {
    console.log(snapStart);
    const data = JSON.stringify(snapStart);
    await window.ipc.invoke("start-program", data);
    toast({
      title: "모든 작업 완료",
      isClosable: true,
      status: "success",
    });
  };
  return <StartButton fn={handleStartProgram} />;
};
