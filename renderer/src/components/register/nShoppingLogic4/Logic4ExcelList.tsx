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
  Code,
} from "@chakra-ui/react";

export const Logic4ExcelList = ({ selectedGroupName, selectedExcelList }) => {
  return (
    <Flex>
      <Box>
        <FormControl>
          <FormLabel>
            <Text>
              {selectedGroupName} 쇼핑 리스트 {selectedExcelList.length}개
            </Text>
          </FormLabel>
          <TableContainer>
            <Table variant="striped" colorScheme="gray" size={"sm"}>
              <TableCaption>선택된 쇼핑 리스트</TableCaption>
              <Thead>
                <Tr>
                  <Th>num</Th>
                  <Th>targetKeyword</Th>
                  <Th>nvMidList</Th>
                  <Th>nvMid</Th>
                  <Th>dayCount</Th>
                  <Th>nowCount</Th>
                  <Th>delayTime</Th>
                  <Th>workKeywordList</Th>
                </Tr>
              </Thead>
              <Tbody>
                {selectedExcelList.map((v: any, i) => (
                  <Tr key={i}>
                    <Td>{i + 1}</Td>
                    <Td>{v?.targetKeyword}</Td>
                    <Td>{v?.nvMidList}</Td>
                    <Td>{v?.nvMid}</Td>
                    <Td>{v?.dayCount}</Td>
                    <Td>{v?.nowCount}</Td>
                    <Td>{v?.delayTime}</Td>
                    <Td>
                      {v?.workKeywordList?.map((v, i) => (
                        <Flex key={i} gap={3} py={1}>
                          <Code bg={"gray.100"}>{v.workKeyword}</Code>
                          <Text>{v.targetBlog}</Text>
                        </Flex>
                      ))}
                    </Td>
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
