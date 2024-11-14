"use client";

import { SelectProgramForStart } from "@/components/start/SelectProgramForStart";
import { useSnapshot } from "valtio/react";
import { storeNShopping } from "@/valtio/nShopping.register.valtio";
import { storeStart } from "@/valtio/start.valtio";

export const SelectProgramForStartLogic = () => {
  const { groupList } = useSnapshot(storeNShopping);
  const { nShopping } = useSnapshot(storeStart);

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedGroupName = selectedOption.text; // 선택된 option의 텍스트(groupName) 가져오기

    console.log("groupId:", selectedId);
    console.log("groupName:", selectedGroupName);

    storeStart.nShopping.selectedGroup = {
      groupName: selectedGroupName,
      groupId: selectedId,
    };
  };

  return (
    <SelectProgramForStart
      groupList={groupList}
      handleSelectChange={handleSelectChange}
      selectProgram={"nShopping"}
    />
  );
};
