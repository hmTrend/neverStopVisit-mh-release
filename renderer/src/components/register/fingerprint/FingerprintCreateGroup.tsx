import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useCreateFingerPrintGroup } from "@/hook/fingerPrint/useCreateFingerPrintGroup";

export const FingerprintCreateGroup = () => {
  const groupNameRef = useRef<HTMLInputElement>(null);
  const { createFingerPrintGroup } = useCreateFingerPrintGroup();
  const handleSubmit = async () => {
    console.log("1");
    console.log(groupNameRef.current.value);
    const groupName = groupNameRef.current.value;
    await createFingerPrintGroup({ groupName, memberFid: "aaa" });
  };
  return (
    <Flex>
      <Box>
        <FormControl>
          <FormLabel>그룹 만들기</FormLabel>
          <Box display={"flex"}>
            <Input type="email" ref={groupNameRef} />
            <Button onClick={handleSubmit}>그룹생성</Button>
          </Box>
          <FormHelperText>새로운 그룹을 생성합니다.</FormHelperText>
        </FormControl>
      </Box>
    </Flex>
  );
};
