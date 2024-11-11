import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export const FingerprintCreateExcel = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const toast = useToast();

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

      console.log("result 3333");
      console.log(result);
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

  return (
    <Flex>
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
              <Button onClick={handleExcelButtonClick}>엑셀생성</Button>
            </Box>
            <Button variant={"outline"}>기존엑셀 다운받기</Button>
          </Flex>
          <FormHelperText>
            새로운 엑셀리스트로 교체합니다 (기존값 삭제됨)
          </FormHelperText>
        </FormControl>
      </Box>
    </Flex>
  );
};
