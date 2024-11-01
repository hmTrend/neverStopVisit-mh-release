import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";

export const RegisterPersonalMarkCreateExcel = () => {
  return (
    <Flex>
      <Box>
        <FormControl>
          <FormLabel>엑셀 만들기</FormLabel>
          <Flex gap={6}>
            <Box display={"flex"}>
              <Input type="email" />
              <Button>엑셀생성</Button>
            </Box>
            <Button variant={"outline"}>기존엑셀 다운받기</Button>
          </Flex>
          <FormHelperText>
            새로운 엑셀리스트로 교체합니다 (기존값 삭제됨)
          </FormHelperText>
        </FormControl>
      </Box>
    </Flex>
  );
};
