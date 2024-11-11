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
  Code,
  Text,
} from "@chakra-ui/react";
import { useSnapshot } from "valtio/react";
import { storeFingerPrintRegister } from "@/valtio/fingerPrint.register.valtio";
import { CommonUtil } from "@/util/common.util";

export const FingerprintExcelList = () => {
  const { selectedGroupName, selectedExcelList } = useSnapshot(
    storeFingerPrintRegister,
  );

  return (
    <Flex>
      <Box>
        <FormControl>
          <FormLabel>
            <Text>
              {selectedGroupName} 지문 리스트 {selectedExcelList.length}개
            </Text>
          </FormLabel>
          <TableContainer>
            <Table variant="striped" colorScheme="gray" size={"sm"}>
              <TableCaption>선택된 지문 리스트</TableCaption>
              <Thead>
                <Tr>
                  <Th>번호</Th>
                  <Th>아이디</Th>
                  <Th>현재비번</Th>
                  <Th>이전비번</Th>
                  <Th>상태</Th>
                  <Th>쿠키</Th>
                  <Th>폰번호</Th>
                </Tr>
              </Thead>
              <Tbody>
                {selectedExcelList.map((v: any, i) => (
                  <Tr key={i}>
                    <Td>{i + 1}</Td>
                    <Td>{v.nId}</Td>
                    <Td>{CommonUtil.maskLast4Digits(v.nPw)}</Td>
                    <Td>{CommonUtil.maskLast4Digits(v.bPw)}</Td>
                    <Td>{v.nState}</Td>
                    <Td>2024-10-22</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </FormControl>
      </Box>
    </Flex>
  );
};
