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
  Kbd,
} from "@chakra-ui/react";
import { useSnapshot } from "valtio/react";
import { storeFingerPrintRegister } from "@/valtio/fingerPrint.register.valtio";

export const FingerprintExcelList = () => {
  const { selectedGroupName } = useSnapshot(storeFingerPrintRegister);

  return (
    <Flex>
      <Box>
        <FormControl>
          <FormLabel>
            <Kbd fontSize={"md"}>{selectedGroupName}</Kbd> 지문 리스트
          </FormLabel>
          <TableContainer>
            <Table variant="striped" colorScheme="gray" size={"sm"}>
              <TableCaption>선택된 지문 리스트</TableCaption>
              <Thead>
                <Tr>
                  <Th>3개</Th>
                  <Th>쿠키</Th>
                  <Th>만든날짜</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>[cookie list]</Td>
                  <Td isNumeric>2024-10-22</Td>
                </Tr>
                <Tr>
                  <Td>2</Td>
                  <Td>[cookie list]</Td>
                  <Td isNumeric>2024-10-22</Td>
                </Tr>
                <Tr>
                  <Td>3</Td>
                  <Td>[cookie list]</Td>
                  <Td isNumeric>2024-10-22</Td>
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
