import { Box, Flex, Stat, StatArrow, Text, useToast } from "@chakra-ui/react";
import { useSnapshot } from "valtio/react";
import { storeWork } from "@/valtio/work.valtio";
import { useEffect } from "react";

export function WorkCompletedList() {
  const { completedList } = useSnapshot(storeWork);
  const toast = useToast();

  useEffect(() => {
    const cleanup = window.ipc.on("error-to-front-result", (args: any) => {
      if (args.errorMessage !== "당일작업완료") {
        storeWork.addToCompletedList(args);
        console.log("args 333333");
        console.log(args);
      } else {
        toast({
          title: "당일작업완료",
          status: "loading",
          isClosable: true,
          duration: 300 * 1000,
        });
      }
    });
    return cleanup;
  }, []);

  return (
    <Flex direction={"column"} fontSize={"xs"}>
      <Box display={"flex"} gap={3}>
        <Text>성공</Text>
        <Text>번호</Text>
        <Text>유형</Text>
        <Text>로직</Text>
        <Text>타겟키워드</Text>
        <Text>워크키워드</Text>
        <Text>내아이피</Text>
        <Text>작업시간(대기초수)</Text>
        <Text>변경시간</Text>
        <Text>작성날짜</Text>
        <Text>에러내용</Text>
      </Box>
      {completedList?.map((v, i) => (
        <Box display={"flex"} gap={3} key={i}>
          <Box width="20px">
            {v?.errorMessage === "" ? (
              <Stat>
                <StatArrow type="increase" />
              </Stat>
            ) : (
              <Stat>
                <StatArrow type="decrease" />
              </Stat>
            )}
          </Box>
          <Text>{i + 1}</Text>
          <Text>{v?.workType === "NShoppingLogic4" ? "쇼핑" : "플레이스"}</Text>
          <Text>{v?.logicType}</Text>
          <Text>{v?.targetKeyword}</Text>
          <Text>{v?.workKeyword}</Text>
          <Text>
            {v?.myIp} ({v?.myProxy})
          </Text>
          <Text color={"red"}>
            {v?.totalWorkingTime}초 ({v?.delayTime}초)
          </Text>
          <Text color={"green"}>{v?.changeTime}초</Text>
          <Text>{v?.createdAt}</Text>
          <Text>{v?.errorMessage}</Text>
        </Box>
      ))}
    </Flex>
  );
}
