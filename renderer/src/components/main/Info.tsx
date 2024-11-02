import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Code,
  Flex,
} from "@chakra-ui/react";
import { version } from "../../../../package.json";

export const Info = () => {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Never Stop Visit</TableCaption>
        <Thead>
          <Tr>
            <Th>명칭</Th>
            <Th>설명</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>네버 스탑 비지트</Td>
            <Td>v{version}</Td>
          </Tr>
          <Tr>
            <Td>제품</Td>
            <Td>
              <Flex gap={3}>
                <Code>NP</Code>
                <Code>NS</Code>
                <Code>CP</Code>
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
