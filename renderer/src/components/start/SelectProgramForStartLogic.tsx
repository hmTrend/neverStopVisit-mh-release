"use client";

import { SelectProgramForStart } from "@/components/start/SelectProgramForStart";
import { useSnapshot } from "valtio/react";
import { storeNShopping } from "@/valtio/nShopping.register.valtio";
import { storeStart } from "@/valtio/start.valtio";

export const SelectProgramForStartLogic = () => {
  const { groupList: nShoppingGroupList } = useSnapshot(storeNShopping);

  const handleSelectChangeNShopping = (e) => {
    const selectedId = e.target.value;
    // groupList에서 선택된 그룹 찾기
    const selectedGroup: any = nShoppingGroupList.find(
      (group: any) => group._id === selectedId,
    );

    if (selectedGroup) {
      const newSelectedGroup = {
        groupName: selectedGroup.groupName,
        groupId: selectedGroup._id,
      };

      // valtio store 업데이트
      storeStart.nShopping.selectedGroup = newSelectedGroup;
      // localStorage 업데이트
    }
  };

  return (
    <SelectProgramForStart
      groupList={nShoppingGroupList}
      handleSelectChange={handleSelectChangeNShopping}
      selectProgram={"nShopping"}
    />
  );
};
