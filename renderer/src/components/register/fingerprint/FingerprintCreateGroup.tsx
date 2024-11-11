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

export const FingerprintCreateGroup = () => {
  const groupNameRef = useRef<HTMLInputElement>(null);
  const handleSubmit = () => {
    console.log("1");
    console.log(groupNameRef.current.value);
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
