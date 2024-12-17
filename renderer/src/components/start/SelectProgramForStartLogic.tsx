"use client";

import { SelectProgramForStart } from "@/components/start/SelectProgramForStart";
import { useSnapshot } from "valtio/react";
import { storeNShopping } from "@/valtio/nShopping.register.valtio";
import { storeStart } from "@/valtio/start.valtio";
import { Flex } from "@chakra-ui/react";
import { storeNPlace } from "@/valtio/nPlace.register.valtio";

export const SelectProgramForStartLogic = () => {
  const { groupList: nShoppingGroupList, logicType: nShoppingLogicType } =
    useSnapshot(storeNShopping);
  const { groupList: nPlaceGroupList, logicType: nPlaceLogicType } =
    useSnapshot(storeNPlace);

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
        groupList={nShoppingGroupList}
        handleSelectChange={handleSelectChangeNShopping}
        selectProgram={"nShopping"}
        logicType={nPlaceLogicType}
      />
      <SelectProgramForStart
        groupList={nPlaceGroupList}
        handleSelectChange={handleSelectChangeNPlace}
        selectProgram={"nPlace"}
        logicType={nShoppingLogicType}
      />
    </Flex>
  );
};
