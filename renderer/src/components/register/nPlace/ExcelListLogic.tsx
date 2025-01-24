import { useSnapshot } from "valtio/react";
import { useEffect } from "react";
import { storeNPlace } from "@/valtio/nPlace.register.valtio";
import { useGetExcelList } from "@/hook/nPlace/useGetExcelList";
import { ExcelList } from "@/components/register/nPlace/ExcelList";

export const ExcelListLogic = () => {
  const { selectedGroupName, selectedExcelList, selectedGroupId } =
    useSnapshot(storeNPlace);
  const { getExcelList } = useGetExcelList();

  const GetExcelList = async () => {
    console.log("selectedGroupId");
    console.log(selectedGroupId);
    if (selectedGroupId) {
      const { data } = await getExcelList({ groupFid: selectedGroupId });
      return { data };
    }
  };
  useEffect(() => {
    if (!selectedGroupName) return;
    GetExcelList().then((v: any) => {
      storeNPlace.selectedExcelList = v.data;
    });
  }, [selectedGroupName]);

  return (
    <ExcelList
      selectedGroupName={selectedGroupName}
      selectedExcelList={selectedExcelList}
    />
  );
};
