import {
  Box,
  Button,
  Code,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { forwardRef, useRef } from "react";
import { CreateExcelModal } from "@/components/register/_commons/CreateExcel.modal";

export const CreateExcel = (
  {
    handleFileSelect,
    selectedGroupName,
    handleCreateExcelList,
    handleClearExcelList,
    selectedFile,
    title = "",
  },
  ref,
) => {
  const fileInputRef = useRef(null);

  const handleExcelButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
              <Button onClick={handleExcelButtonClick}>
                {title} 엑셀 생성
              </Button>
            </Box>
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
              <CreateExcelModal
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
