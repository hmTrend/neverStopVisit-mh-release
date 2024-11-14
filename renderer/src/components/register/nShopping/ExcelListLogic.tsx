import { useSnapshot } from "valtio/react";
import { useEffect } from "react";
import { ExcelList } from "@/components/register/nShopping/ExcelList";
import { storeNShopping } from "@/valtio/nShopping.register.valtio";
import { useGetExcelList } from "@/hook/nShopping/useGetExcelList";

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
      storeNShopping.selectedExcelList = v.data;
    });
  }, [selectedGroupName]);

  return (
    <ExcelList
      selectedGroupName={selectedGroupName}
      selectedExcelList={selectedExcelList}
    />
  );
};
