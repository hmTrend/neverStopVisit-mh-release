import { Box, Button } from "@chakra-ui/react";

export const StartButton = ({ fn }) => {
  return (
    <Box>
      <Button onClick={fn}>작업 시작하기</Button>
    </Box>
  );
};
