import { Box, Flex, Text } from "@chakra-ui/react";
import { useSnapshot } from "valtio/react";
import { storeWork } from "@/valtio/work.valtio";
import { useEffect } from "react";

export function WorkCompletedList() {
  const { completedList } = useSnapshot(storeWork);

  useEffect(() => {
    const cleanup = window.ipc.on("error-to-front-result", (args: any) => {
      storeWork.completedList.push(args);
    });
    return cleanup;
  }, []);

  return (
    <Flex direction={"column"} fontSize={"xs"}>
      <Box display={"flex"} gap={3}>
        <Text>번호</Text>
        <Text>에러내용</Text>
      </Box>
      {completedList?.map((v, i) => (
        <Box display={"flex"} gap={3} key={i}>
          <Text>{i + 1}</Text>
          <Text>{v?.targetKeyword}</Text>
          <Text>{v?.workType}</Text>
          <Text>{v?.errorMessage}</Text>
        </Box>
      ))}
    </Flex>
  );
}
