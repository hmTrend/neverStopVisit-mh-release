import {
  Box,
  Button,
  Code,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Kbd,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useSnapshot } from "valtio/react";
import { storeFingerPrintRegister } from "@/valtio/fingerPrint.register.valtio";
import { useCreateExcelList } from "@/hook/fingerPrint/useCreateExcelList";
import { FingerprintCreateExcelModal } from "@/components/register/fingerprint/FingerprintCreateExcel.modal";

export const FingerprintCreateExcel = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const toast = useToast();
  const {
    selectedGroupName,
    getExcelList,
    selectedExcelList,
    selectedGroupId,
  } = useSnapshot(storeFingerPrintRegister);
  const { createExcelList } = useCreateExcelList();

  const handleExcelButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];

    if (file) {
      // 파일 확장자 검사
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!["xlsx", "xls"].includes(fileExtension)) {
        toast({
          title: "잘못된 파일 형식",
          description: "Excel 파일(.xlsx, .xls)만 선택 가능합니다.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      setSelectedFile(file);
      const result = await window.ipc.invoke("process-excel-file", file.path);
      storeFingerPrintRegister.getExcelList = result.data;

      // 파일 선택 성공 메시지
      toast({
        title: result.success ? "성공" : "오류",
        description: result.message,
        status: result.success ? "success" : "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCreateExcelList = async () => {
    if (getExcelList.length === 0) {
      toast({
        title: "생성된 엑셀없음",
        isClosable: true,
        duration: 3000,
        status: "error",
      });
      return;
    }
    if (!selectedGroupName) {
      toast({
        title: "선택된 그룹없음",
        isClosable: true,
        duration: 3000,
        status: "error",
      });
      return;
    }
    const inputList = getExcelList.map((v) => ({
      ...v,
      groupFid: selectedGroupId,
    }));
    const { data } = await createExcelList({
      input: inputList,
    });
    storeFingerPrintRegister.selectedExcelList = getExcelList;
  };

  const handleClearExcelList = () => {
    storeFingerPrintRegister.getExcelList = [];
    toast({
      title: "가져온 엑셀리스트 비우기 성공",
      isClosable: true,
      duration: 3000,
      status: "success",
    });
  };

  return (
    <Flex direction={"column"} gap={3}>
      <Box>
        <FormControl>
          <FormLabel>엑셀 만들기</FormLabel>
          <Flex gap={6}>
            <Box display={"flex"}>
              <Input
                value={selectedFile ? selectedFile.name : ""}
                readOnly
                placeholder="선택된 파일 없음"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".xlsx,.xls"
                style={{ display: "none" }}
              />
              <Button onClick={handleExcelButtonClick}>엑셀 생성</Button>
            </Box>
            <Button variant={"outline"}>기존엑셀 다운받기</Button>
          </Flex>
          <FormHelperText>새로운 엑셀리스트를 가져옵니다.</FormHelperText>
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>엑셀 등록하기</FormLabel>
          <Flex gap={6}>
            <Box display={"flex"} alignItems={"center"} gap={3}>
              <Code fontSize={"xl"} px={4} py={1}>
                {selectedGroupName || "선택된 그룹 없음"}
              </Code>
              <FingerprintCreateExcelModal
                fn={handleCreateExcelList}
                selectedGroupName={selectedGroupName}
              />
            </Box>
            <Button variant={"outline"} onClick={handleClearExcelList}>
              가져온 엑셀비우기
            </Button>
          </Flex>
          <FormHelperText>
            새로운 엑셀리스트로 교체합니다 (기존값 삭제됨)
          </FormHelperText>
        </FormControl>
      </Box>
    </Flex>
  );
};
