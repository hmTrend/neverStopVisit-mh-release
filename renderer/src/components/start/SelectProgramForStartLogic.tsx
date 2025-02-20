"use client";

import { SelectProgramForStart } from "@/components/start/SelectProgramForStart";
import { useSnapshot } from "valtio/react";
import { storeStart } from "@/valtio/start.valtio";
import { Flex } from "@chakra-ui/react";
import { storeNPlace } from "@/valtio/nPlace.register.valtio";
import { storeNShoppingLogic4 } from "@/valtio/nShoppingLogic4.register.valtio";

export const SelectProgramForStartLogic = () => {
  const {
    groupList: nShoppingLogic4GroupList,
    logicType: nShoppingLogic4LogicType,
  } = useSnapshot(storeNShoppingLogic4);
  const { groupList: nPlaceGroupList, logicType: nPlaceLogicType } =
    useSnapshot(storeNPlace);

  const handleSelectChangeNShoppingLogic4 = (e) => {
    const selectedId = e.target.value;
    // groupList에서 선택된 그룹 찾기
    const selectedGroup: any = nShoppingLogic4GroupList.find(
      (group: any) => group._id === selectedId,
    );

    if (selectedGroup) {
      const newSelectedGroup = {
        groupName: selectedGroup.groupName,
        groupId: selectedGroup._id,
      };

      // valtio store 업데이트
      storeStart.nShoppingLogic4.selectedGroup = newSelectedGroup;
      // localStorage 업데이트
    }
  };

  const handleSelectChangeNPlace = (e) => {
    const selectedId = e.target.value;
    // groupList에서 선택된 그룹 찾기
    const selectedGroup: any = nPlaceGroupList.find(
      (group: any) => group._id === selectedId,
    );

    if (selectedGroup) {
      const newSelectedGroup = {
        groupName: selectedGroup.groupName,
        groupId: selectedGroup._id,
      };

      // valtio store 업데이트
      storeStart.nPlace.selectedGroup = newSelectedGroup;
      // localStorage 업데이트
    }
  };

  return (
    <Flex direction={"column"} gap={9}>
      <SelectProgramForStart
        groupList={nShoppingLogic4GroupList}
        handleSelectChange={handleSelectChangeNShoppingLogic4}
        selectProgram={"nShoppingLogic4"}
        logicType={nShoppingLogic4LogicType}
      />
      <SelectProgramForStart
        groupList={nPlaceGroupList}
        handleSelectChange={handleSelectChangeNPlace}
        selectProgram={"nPlace"}
        logicType={nPlaceLogicType}
      />
    </Flex>
  );
};
