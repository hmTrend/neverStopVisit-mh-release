"use client";

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
import { useEffect, useState } from "react";

export const Info = () => {
  const [usagePeriod, setUsagePeriod] = useState("");

  useEffect(() => {
    programUsagePeriodResult();
  }, []);

  const programUsagePeriodResult = () => {
    window.ipc.on("program-usage-period-result", (args: any) => {
      console.log("args 3333222");
      console.log(args);
      setUsagePeriod(args);
    });
  };

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
            <Td>네버스탑비지트</Td>
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
          <Tr>
            <Td>유효기간</Td>
            <Td>
              <Flex gap={3}>
                <Code>{usagePeriod}일</Code>
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
