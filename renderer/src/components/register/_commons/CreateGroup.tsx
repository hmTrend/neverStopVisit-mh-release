import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { forwardRef } from "react";

export const CreateGroup = forwardRef(({ fn, loading }, ref) => {
  return (
    <Flex>
      <Box>
        <FormControl>
          <FormLabel>그룹 만들기</FormLabel>
          <Box display={"flex"}>
            <Input type="email" ref={ref} />
            <Button onClick={fn} isLoading={loading}>
              그룹생성
            </Button>
          </Box>
          <FormHelperText>새로운 그룹을 생성합니다.</FormHelperText>
        </FormControl>
      </Box>
    </Flex>
  );
});
