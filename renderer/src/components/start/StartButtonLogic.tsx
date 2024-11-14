"use client";

import { StartButton } from "@/components/start/StartButton";
import { useSnapshot } from "valtio/react";
import { storeStart } from "@/valtio/start.valtio";

export const StartButtonLogic = () => {
  const snapStart = useSnapshot(storeStart);
  const handleStartProgram = async () => {
    console.log(snapStart);
    const data = JSON.stringify(snapStart);
    await window.ipc.invoke("start-program", data);
  };
  return <StartButton fn={handleStartProgram} />;
};
