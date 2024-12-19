import { Box, Flex, Text } from "@chakra-ui/react";
import { useSnapshot } from "valtio/react";
import { storeWork } from "@/valtio/work.valtio";

export function WorkCompletedList() {
  const { completedList } = useSnapshot(storeWork);
  return (
    <Flex direction={"column"} fontSize={"xs"}>
      <Box display={"flex"} gap={3}>
        <Text>번호</Text>
        <Text>에러내용</Text>
      </Box>
      {completedList.map((v, i) => (
        <Box display={"flex"} gap={3}>
          <Text>{i + 1}</Text>
          <Text>{v.workType}</Text>
          <Text>{v.errorMessage}</Text>
        </Box>
      ))}
    </Flex>
  );
}
