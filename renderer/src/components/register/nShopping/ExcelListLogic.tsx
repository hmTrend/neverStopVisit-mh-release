import { useSnapshot } from "valtio/react";
import { storeFingerPrintRegister } from "@/valtio/fingerPrint.register.valtio";
import { useGetExcelList } from "@/hook/fingerPrint/useGetExcelList";
import { useEffect } from "react";
import { ExcelList } from "@/components/register/nShopping/ExcelList";

export const ExcelListLogic = () => {
  const { selectedGroupName, selectedExcelList, selectedGroupId } = useSnapshot(
    storeFingerPrintRegister,
  );
  const { getExcelList } = useGetExcelList();

  const GetExcelList = async () => {
    const { data } = await getExcelList({ groupFid: selectedGroupId });
    return { data };
  };
  useEffect(() => {
    GetExcelList().then((v: any) => {
      storeFingerPrintRegister.selectedExcelList = v.data.getExcelList.data;
    });
  }, [selectedGroupName]);

  return (
    <ExcelList
      selectedGroupName={selectedGroupName}
      selectedExcelList={selectedExcelList}
    />
  );
};
