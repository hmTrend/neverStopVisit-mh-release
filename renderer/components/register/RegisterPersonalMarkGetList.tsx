import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";

export const RegisterPersonalMarkGetList = () => {
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
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                  <Td>
                    <Button variant={"ghost"}>오픈</Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td>2</Td>
                  <Td>centimetres (cm)</Td>
                  <Td isNumeric>30.48</Td>
                  <Td>
                    <Button variant={"ghost"}>오픈</Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td>3</Td>
                  <Td>metres (m)</Td>
                  <Td isNumeric>0.91444</Td>
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
