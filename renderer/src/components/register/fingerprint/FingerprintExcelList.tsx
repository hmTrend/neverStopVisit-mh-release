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
import { useEffect } from "react";
import { useGetExcelList } from "@/hook/fingerPrint/useGetExcelList";
import { FingerprintCookeCook } from "@/components/register/fingerprint/FingerprintCookeCook";

export const FingerprintExcelList = () => {
  const toast = useToast();
  const {
    selectedGroupName,
    selectedExcelList,
    selectedGroupId,
    listTotalCount,
  } = useSnapshot(storeFingerPrintRegister);
  const { getExcelList } = useGetExcelList();

  const GetExcelList = async () => {
    const { data, listTotalCount } = await getExcelList({
      groupFid: selectedGroupId,
    });
    return { data, listTotalCount };
  };
  useEffect(() => {
    GetExcelList().then((v: any) => {
      storeFingerPrintRegister.selectedExcelList = v.data;
      storeFingerPrintRegister.listTotalCount = v.listTotalCount;
    });
  }, [selectedGroupName]);

  const fingerprintExcelList = async ({ _id, cookie }) => {
    try {
      const result = await window.ipc.invoke("finger-print-browser-open", {
        _id,
        cookie,
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

  const fingerprintBrowserClose = async ({ _id }) => {
    try {
      const result = await window.ipc.invoke("finger-print-browser-close", {
        _id,
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

  return (
    <Flex>
      <Box>
        <FormControl>
          <FormLabel>
            <Text>
              {selectedGroupName} 지문 리스트 {listTotalCount}개
            </Text>
          </FormLabel>
          <TableContainer>
            <Table variant="striped" colorScheme="gray" size={"sm"}>
              <TableCaption>선택된 지문 리스트</TableCaption>
              <Thead>
                <Tr>
                  <Th>번호</Th>
                  <Th>타입</Th>
                  <Th>아이디</Th>
                  <Th>현재비번</Th>
                  <Th>이전비번</Th>
                  <Th>상태</Th>
                  <Th>쿠키</Th>
                  <Th>생성일</Th>
                  <Th>아이피</Th>
                  <Th>폰번호</Th>
                  <Th>지문열기</Th>
                  <Th>지문닫기</Th>
                  <Th>삭제여부</Th>
                </Tr>
              </Thead>
              <Tbody>
                {selectedExcelList?.map((v: any, i) => (
                  <Tr key={i}>
                    <Td>{i + 1}</Td>
                    <Td>{v.type}</Td>
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
                    <Td>{v.createdAt}</Td>
                    <Td>{v.ip}</Td>
                    <Td>{v.phoneNumber}</Td>
                    <Td>
                      <Button
                        onClick={() =>
                          fingerprintExcelList({ _id: v._id, cookie: v.cookie })
                        }
                        fontSize={"xs"}
                        variant={"link"}
                      >
                        OPEN
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        onClick={() => fingerprintBrowserClose({ _id: v._id })}
                        fontSize={"xs"}
                        variant={"link"}
                      >
                        CLOSE
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        onClick={() => fingerprintBrowserClose({ _id: v._id })}
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
