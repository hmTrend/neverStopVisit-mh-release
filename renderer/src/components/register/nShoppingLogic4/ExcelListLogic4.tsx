import { useSnapshot } from "valtio/react";
import { useEffect } from "react";
import { Logic4ExcelList } from "@/components/register/nShoppingLogic4/Logic4ExcelList";
import { storeNShoppingLogic4 } from "@/valtio/nShoppingLogic4.register.valtio";
import { useGetExcelList } from "@/hook/nShoppingLogic4/useGetExcelList";

export const ExcelListLogic4 = () => {
  const { selectedGroupName, selectedExcelList, selectedGroupId } =
    useSnapshot(storeNShoppingLogic4);
  const { getExcelList } = useGetExcelList();

  const GetExcelList = async () => {
    const { data } = await getExcelList({ groupFid: selectedGroupId });
    return { data };
  };
  useEffect(() => {
    GetExcelList().then((v: any) => {
      storeNShoppingLogic4.selectedExcelList = v.data;
    });
  }, [selectedGroupName]);

  return (
    <Logic4ExcelList
      selectedGroupName={selectedGroupName}
      selectedExcelList={selectedExcelList}
    />
  );
};
