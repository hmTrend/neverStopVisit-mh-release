import { useSnapshot } from "valtio/react";
import { useEffect } from "react";
import { storeNShopping } from "@/valtio/nShopping.register.valtio";
import { useGetExcelList } from "@/hook/nShopping/useGetExcelList";
import { Logic4ExcelList } from "@/components/register/nShoppingLogic4/Logic4ExcelList";

export const ExcelListLogic4 = () => {
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
    <Logic4ExcelList
      selectedGroupName={selectedGroupName}
      selectedExcelList={selectedExcelList}
    />
  );
};
