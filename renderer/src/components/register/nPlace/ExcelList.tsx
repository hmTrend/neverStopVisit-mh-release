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
  Kbd,
} from "@chakra-ui/react";

export const ExcelList = ({ selectedGroupName, selectedExcelList }) => {
  return (
    <Flex>
      <Box>
        <FormControl>
          <FormLabel>
            <Text>
              {selectedGroupName} 플레이스 리스트 {selectedExcelList.length}개
            </Text>
          </FormLabel>
          <TableContainer>
            <Table variant="striped" colorScheme="gray" size={"sm"}>
              <TableCaption>선택된 플레이스 리스트</TableCaption>
              <Thead>
                <Tr>
                  <Th>num</Th>
                  <Th>keyword</Th>
                  <Th>delayTime</Th>
                  <Th>placeName</Th>
                  <Th>placeNumber</Th>
                  <Th>dayCount</Th>
                  <Th>subKeywordList</Th>
                </Tr>
              </Thead>
              <Tbody>
                {selectedExcelList.map((v: any, i) => (
                  <Tr key={i}>
                    <Td>{i + 1}</Td>
                    <Td>{v.keyword}</Td>
                    <Td>{v.delayTime}</Td>
                    <Td>{v.placeName}</Td>
                    <Td>{v.placeNumber}</Td>
                    <Td>{v.dayCount}</Td>
                    <Td>
                      {v.subKeywordList.map((v, i) => (
                        <Flex key={i} gap={1}>
                          <Text>{v?.dayCount}</Text>
                          <Kbd fontSize={"sm"}>{v?.targetKeyword}</Kbd>
                          <Text>{v?.targetBlog}</Text>
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
