import { Box, Flex, Stat, StatArrow, Text } from "@chakra-ui/react";
import { useSnapshot } from "valtio/react";
import { storeWork } from "@/valtio/work.valtio";
import { useEffect } from "react";

export function WorkCompletedList() {
  const { completedList } = useSnapshot(storeWork);

  useEffect(() => {
    const cleanup = window.ipc.on("error-to-front-result", (args: any) => {
      storeWork.addToCompletedList(args);
      console.log("args 333333");
      console.log(args);
    });
    return cleanup;
  }, []);

  return (
    <Flex direction={"column"} fontSize={"xs"}>
      <Box display={"flex"} gap={3}>
        <Text>성공</Text>
        <Text>번호</Text>
        <Text>작업타입</Text>
        <Text>타겟키워드</Text>
        <Text>내아이피</Text>
        <Text>작업시간</Text>
        <Text>에러내용</Text>
      </Box>
      {completedList?.map((v, i) => (
        <Box display={"flex"} gap={3} key={i}>
          <Box width="20px">
            {v?.errorMessage === "" ? (
              <Stat>
                <StatArrow type="decrease" />
              </Stat>
            ) : (
              <Stat>
                <StatArrow type="increase" />
              </Stat>
            )}
          </Box>
          <Text>{i + 1}</Text>
          <Text>{v?.workType === "NShoppingLogic4" ? "쇼핑" : "플레이스"}</Text>
          <Text>{v?.targetKeyword}</Text>
          <Text>{v?.myIp}</Text>
          <Text>{v?.createdAt}</Text>
          <Text>{v?.errorMessage}</Text>
        </Box>
      ))}
    </Flex>
  );
}
