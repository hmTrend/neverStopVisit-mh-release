import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";

export const RegisterPersonalMarkGetGroupList = () => {
  return (
    <Flex>
      <Box>
        <FormControl>
          <FormLabel>생성된 그룹리스트</FormLabel>
          <Box display={"flex"} gap={3}>
            <Button variant={"outline"}>그룹1</Button>
            <Button variant={"outline"}>그룹2</Button>
            <Button variant={"outline"}>그룹3</Button>
          </Box>
          <FormHelperText>생성된 그룹 리스트를 선택합니다.</FormHelperText>
        </FormControl>
      </Box>
    </Flex>
  );
};
