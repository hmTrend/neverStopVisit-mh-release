import { useSnapshot } from "valtio/react";
import { useGetExcelList } from "@/hook/fingerPrint/useGetExcelList";
import { useEffect } from "react";
import { ExcelList } from "@/components/register/nShopping/ExcelList";
import { storeNShopping } from "@/valtio/nShopping.register.valtio";

export const ExcelListLogic = () => {
  const { selectedGroupName, selectedExcelList, selectedGroupId } =
    useSnapshot(storeNShopping);
  const { getExcelList } = useGetExcelList();

  const GetExcelList = async () => {
    const { data } = await getExcelList({ groupFid: selectedGroupId });
    return { data };
  };
  useEffect(() => {
    GetExcelList().then((v: any) => {
      storeNShopping.selectedExcelList = v.data.getExcelList.data;
    });
  }, [selectedGroupName]);

  return (
    <ExcelList
      selectedGroupName={selectedGroupName}
      selectedExcelList={selectedExcelList}
    />
  );
};
