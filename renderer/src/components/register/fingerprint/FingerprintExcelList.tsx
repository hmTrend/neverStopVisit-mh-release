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
  Button,
  useToast,
} from "@chakra-ui/react";
import { useSnapshot } from "valtio/react";
import { storeFingerPrintRegister } from "@/valtio/fingerPrint.register.valtio";
import { CommonUtil } from "@/util/common.util";
import CopyToClipboardButton from "@/components/_commons/CopyToClipboardButton";
import { useEffect, useState } from "react";
import { useGetExcelList } from "@/hook/fingerPrint/useGetExcelList";
import { FingerprintCookeCook } from "@/components/register/fingerprint/FingerprintCookeCook";
import FingerprintButton from "@/components/register/fingerprint/FingerprintButton";
import { FingerprintExcelListDataListCount } from "@/components/register/fingerprint/FingerprintExcelListDataListCount";
const openBrowsers = new Map();

export const FingerprintExcelList = () => {
  const toast = useToast();
  const {
    selectedGroupName,
    selectedExcelList,
    selectedGroupId,
    listTotalCount,
    fingerPrintNetworkType,
  } = useSnapshot(storeFingerPrintRegister);
  const { getExcelList } = useGetExcelList();

  const GetExcelList = async ({ dataListCount }) => {
    const { data, listTotalCount } = await getExcelList({
      groupFid: selectedGroupId,
      dataListCount,
    });
    return { data, listTotalCount };
  };
  useEffect(() => {
    GetExcelList({ dataListCount: 100 }).then((v: any) => {
      storeFingerPrintRegister.selectedExcelList = v.data;
      storeFingerPrintRegister.listTotalCount = v.listTotalCount;
    });
  }, [selectedGroupName]);

  useEffect(() => {
    console.log("selectedExcelList 3333333");
    console.log(selectedExcelList);
  }, [selectedExcelList]);

  const fingerprintExcelList = async ({ _id }) => {
    try {
      const result = await window.ipc.invoke("finger-print-browser-open", {
        _id,
      });
    } catch (e) {
      console.error(e.message);
      toast({
        title: "지문열기 실패",
        description: `${e.message.includes("initialize") ? "쿠키 검증 실패" : e.message.includes("valid JSON") ? "쿠키값 형식 오류" : "기타 오픈실패"}`,
        isClosable: true,
        duration: 3000,
        status: "error",
      });
    }
  };

  const fingerprintBrowserClose = async ({ _id, type }) => {
    try {
      const result = await window.ipc.invoke("finger-print-browser-close", {
        _id,
        type,
      });
    } catch (e) {
      console.error(e.message);
      toast({
        title: "지문닫기 실패",
        description: `${e.message.includes("initialize") ? "쿠키 검증 실패" : e.message.includes("valid JSON") ? "쿠키값 형식 오류" : "기타 닫기실패"}`,
        isClosable: true,
        duration: 3000,
        status: "error",
      });
    }
  };

  const handleCountChange = (value) => {
    console.log("Selected count:", value);
    GetExcelList({ dataListCount: parseInt(value) }).then((v: any) => {
      storeFingerPrintRegister.selectedExcelList = v.data;
      storeFingerPrintRegister.listTotalCount = v.listTotalCount;
    });
  };

  return (
    <Flex>
      <Box>
        <FormControl>
          <FormLabel>
            <Flex gap={6}>
              <Text>
                {selectedGroupName} 지문 리스트 {listTotalCount}개
              </Text>
              <FingerprintExcelListDataListCount
                onCountChange={handleCountChange}
              />
            </Flex>
          </FormLabel>
          <TableContainer>
            <Table variant="striped" colorScheme="gray" size={"sm"}>
              <TableCaption>선택된 지문 리스트</TableCaption>
              <Thead>
                <Tr>
                  <Th>번호</Th>
                  <Th>타입</Th>
                  <Th>업데이트</Th>
                  <Th>지문열기</Th>
                  <Th>아이디</Th>
                  <Th>현재비번</Th>
                  <Th>이전비번</Th>
                  <Th>상태</Th>
                  <Th>쿠키</Th>
                  <Th>아이피</Th>
                  <Th>폰번호</Th>

                  <Th>삭제여부</Th>
                </Tr>
              </Thead>
              <Tbody>
                {selectedExcelList?.map((v: any, i) => (
                  <Tr key={i}>
                    <Td>{i + 1}</Td>
                    <Td>{v.type}</Td>
                    <Td>
                      <Text
                        color={v.isLatest ? "red.500" : "inherit"}
                        fontWeight={v.isLatest ? "bold" : "normal"}
                        bg={v.isLatest ? "red.50" : "transparent"}
                        p={v.isLatest ? 2 : 0}
                        borderRadius={v.isLatest ? "md" : "none"}
                      >
                        {v.updatedAt}
                      </Text>
                    </Td>
                    <Td>
                      <FingerprintButton
                        _id={v._id}
                        type={v.type}
                        fingerPrintNetworkType={fingerPrintNetworkType}
                      />
                    </Td>
                    <Td>{v.nId}</Td>
                    <Td>{CommonUtil.maskLast4Digits(v.nPw)}</Td>
                    <Td>{CommonUtil.maskLast4Digits(v.bPw)}</Td>
                    <Td>{v.nState}</Td>
                    <Td>
                      <FingerprintCookeCook
                        _id={v._id}
                        nId={v.nId}
                        indexNum={i}
                        type={v.type}
                      />
                    </Td>

                    <Td>{v.ip}</Td>
                    <Td>{v.phoneNumber}</Td>

                    <Td>
                      <Button
                        onClick={() =>
                          fingerprintBrowserClose({ _id: v._id, type: v.type })
                        }
                        fontSize={"xs"}
                        variant={"link"}
                        fontWeight={"light"}
                      >
                        삭제
                      </Button>
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
