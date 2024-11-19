import { Box, Button } from "@chakra-ui/react";

export const StartButton = ({ fn }) => {
  const handleProgramClose = () => {
    window.ipc.send("app:quit", "");
  };

  return (
    <Box display={"flex"} gap={9}>
      <Button onClick={fn} bg={"green.200"}>
        작업 시작하기
      </Button>
      <Button onClick={handleProgramClose}>종료하기</Button>
    </Box>
  );
};
