import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";

export const FingerprintExcelList = () => {
  return (
    <Flex>
      <Box>
        <FormControl>
          <FormLabel>퍼스널마크 리스트</FormLabel>
          <TableContainer>
            <Table variant="striped" colorScheme="teal" size={"sm"}>
              <TableCaption>선택된 퍼스널마크 리스트</TableCaption>
              <Thead>
                <Tr>
                  <Th>3개</Th>
                  <Th>쿠키</Th>
                  <Th>만든날짜</Th>
                  <Th>개별열기</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>[cookie list]</Td>
                  <Td isNumeric>2024-10-22</Td>
                  <Td>
                    <Button variant={"ghost"}>오픈</Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td>2</Td>
                  <Td>[cookie list]</Td>
                  <Td isNumeric>2024-10-22</Td>
                  <Td>
                    <Button variant={"ghost"}>오픈</Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td>3</Td>
                  <Td>[cookie list]</Td>
                  <Td isNumeric>2024-10-22</Td>
                  <Td>
                    <Button variant={"ghost"}>오픈</Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          {/*<FormHelperText>*/}
          {/*  퍼스널마크 리스트가 선택되어야지만 작업가능*/}
          {/*</FormHelperText>*/}
        </FormControl>
      </Box>
    </Flex>
  );
};
