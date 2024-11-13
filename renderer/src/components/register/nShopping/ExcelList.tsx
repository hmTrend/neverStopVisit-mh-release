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
  Text,
} from "@chakra-ui/react";
import { CommonUtil } from "@/util/common.util";
import CopyToClipboardButton from "@/components/commons/CopyToClipboardButton";

export const ExcelList = ({ selectedGroupName, selectedExcelList }) => {
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
                  <Th>num</Th>
                  <Th>title</Th>
                  <Th>catalog</Th>
                  <Th>nvMid</Th>
                  <Th>views</Th>
                  <Th>query</Th>
                </Tr>
              </Thead>
              <Tbody>
                {selectedExcelList.map((v: any, i) => (
                  <Tr key={i}>
                    <Td>{i + 1}</Td>
                    <Td>{v.title}</Td>
                    <Td>{v.catalog}</Td>
                    <Td>{v.nvMid}</Td>
                    <Td>{v.views}</Td>
                    <Td>{v.query}</Td>
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
