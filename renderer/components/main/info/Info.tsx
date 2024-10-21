import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Code,
} from '@chakra-ui/react';

export const Info = () => {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>명칭</Th>
            <Th>설명</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>네버스탑 비지트히트</Td>
            <Td>v0.0.2</Td>
          </Tr>
          <Tr>
            <Td>제품</Td>
            <Td>
              <Code>NP</Code>
              <Code>NS</Code>
              <Code>CP</Code>
            </Td>
          </Tr>
        </Tbody>
        {/*<Tfoot>*/}
        {/*  <Tr>*/}
        {/*	  <Th>To convert</Th>*/}
        {/*	  <Th>into</Th>*/}
        {/*  </Tr>*/}
        {/*</Tfoot>*/}
      </Table>
    </TableContainer>
  );
};
