import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useSnapshot } from "valtio/react";
import { CreateExcel } from "@/components/register/_commons/CreateExcel";
import { storeNPlace } from "@/valtio/nPlace.register.valtio";
import { useCreateExcelList } from "@/hook/nPlace/useCreateExcelList";
import { useCreateExcelListAlignFlat } from "@/hook/nPlace/useCreateExcelListAlignFlat";

export const CreateExcelLogic = () => {
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    selectedGroupName,
    getExcelList,
    getExcelListAlignFlat,
    selectedGroupId,
  } = useSnapshot(storeNPlace);
  const { createExcelList } = useCreateExcelList();
  const { createExcelListAlignFlat } = useCreateExcelListAlignFlat();

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
      const result = await window.ipc.invoke(
        "process-excel-file-n-place",
        file.path,
      );

      const result3 = await window.ipc.invoke(
        "process-excel-file-n-place-data-with-align-flat-map",
        { data: JSON.stringify(result.data) },
      );
      storeNPlace.getExcelList = result.data;
      storeNPlace.getExcelListAlignFlat = result3;
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
      placeNumber: v.placeNumber?.toString(),
    }));
    const { data } = await createExcelList({
      input: inputList,
    });
    storeNPlace.selectedExcelList = inputList;
    console.log("getExcelListAlignFlat 1111111111");
    console.log(getExcelListAlignFlat);
    const { data: data2 } = await createExcelListAlignFlat({
      input: getExcelListAlignFlat,
    });
    console.log("data2 222222222");
    console.log(data2);
  };

  const handleClearExcelList = () => {
    storeNPlace.getExcelList = [];
    toast({
      title: "가져온 엑셀리스트 비우기 성공",
      isClosable: true,
      duration: 3000,
      status: "success",
    });
  };
  return (
    <CreateExcel
      selectedFile={selectedFile}
      handleClearExcelList={handleClearExcelList}
      handleCreateExcelList={handleCreateExcelList}
      handleFileSelect={handleFileSelect}
      selectedGroupName={selectedGroupName}
    />
  );
};
