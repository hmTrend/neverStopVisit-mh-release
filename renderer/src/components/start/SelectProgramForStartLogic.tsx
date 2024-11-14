"use client";

import { SelectProgramForStart } from "@/components/start/SelectProgramForStart";
import { useSnapshot } from "valtio/react";
import { storeStart } from "@/valtio/start.valtio";

export const SelectProgramForStartLogic = () => {
  const { selectProgram } = useSnapshot(storeStart);
  console.log("selectProgram 333");
  console.log(selectProgram);

  const handleSelectChange = (e, programTitle) => {
    const selectedValue = e.target.value;
    const storageKey = `selectedGroup_${programTitle}`;
    localStorage.setItem(storageKey, selectedValue);
  };

  const getSavedValue = (programTitle, groupList) => {
    const storageKey = `selectedGroup_${programTitle}`;
    const savedValue = localStorage.getItem(storageKey);
    // 저장된 값이 현재 groupList에 존재하는지 확인
    const isValidValue = groupList?.some((group) => group._id === savedValue);
    // 유효한 값이 있으면 반환, 없으면 undefined 반환
    return isValidValue ? savedValue : undefined;
  };

  return (
    <SelectProgramForStart
      selectProgram={selectProgram}
      getSavedValue={getSavedValue}
      handleSelectChange={handleSelectChange}
    />
  );
};
