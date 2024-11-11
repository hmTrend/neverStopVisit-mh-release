import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useCreateFingerPrintGroup } from "@/hook/fingerPrint/useCreateFingerPrintGroup";

export const FingerprintCreateGroup = () => {
  const groupNameRef = useRef<HTMLInputElement>(null);
  const { createFingerPrintGroup } = useCreateFingerPrintGroup();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    console.log(groupNameRef.current.value);
    const groupName = groupNameRef.current.value;
    setLoading(true);
    await createFingerPrintGroup({
      groupName,
      memberFid: "67315a7130d6d4d2bb26e38a",
    });
    setLoading(false);
  };
  return (
    <Flex>
      <Box>
        <FormControl>
          <FormLabel>그룹 만들기</FormLabel>
          <Box display={"flex"}>
            <Input type="email" ref={groupNameRef} />
            <Button onClick={handleSubmit} isLoading={loading}>
              그룹생성
            </Button>
          </Box>
          <FormHelperText>새로운 그룹을 생성합니다.</FormHelperText>
        </FormControl>
      </Box>
    </Flex>
  );
};
