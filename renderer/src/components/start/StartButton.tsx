import { Box, Button } from "@chakra-ui/react";
import { storeStart } from "@/valtio/start.valtio";
import { useSnapshot } from "valtio/react";

export const StartButton = ({ fn }) => {
  const snapStore = useSnapshot(storeStart);
  const handleProgramClose = () => {
    window.ipc.send("main:quit", "");
  };

  return (
    <Box display={"flex"} gap={9}>
      <Button
        onClick={() => {
          fn();
        }}
        bg={"green.200"}
        isLoading={snapStore.common.isStart}
      >
        작업 시작하기
      </Button>
      <Button onClick={handleProgramClose}>종료하기</Button>
    </Box>
  );
};
