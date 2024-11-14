"use client";

import { StartButton } from "@/components/start/StartButton";

export const StartButtonLogic = () => {
  const handleStartProgram = () => {
    console.log(1);
  };
  return <StartButton fn={handleStartProgram} />;
};
