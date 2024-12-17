import { GroupList } from "@/components/register/_commons/GroupList";
import { useGetNPlaceGroupList } from "@/hook/nPlace/useGetNPlaceGroupList";
import { useEffect, useState } from "react";
import { storeNPlace } from "@/valtio/nPlace.register.valtio";
import { useDeleteNPlaceGroup } from "@/hook/nPlace/useDeleteNPlaceGroup";

export const GroupListLogic = ({
  selectedGroupName,
  selectedExcelList,
  groupList,
}) => {
  const { getNPlaceGroupList } = useGetNPlaceGroupList();
  const { deleteNPlaceGroup } = useDeleteNPlaceGroup();

  const GetNPlaceGroupList = async () => {
    const { data } = await getNPlaceGroupList();
    storeNPlace.groupList = data;
  };

  useEffect(() => {
    GetNPlaceGroupList();
  }, [selectedGroupName, selectedExcelList]);

  const handleSelectGroup = ({ groupId, groupName }) => {
    storeNPlace.selectedGroupId = groupId;
    storeNPlace.selectedGroupName = groupName;
  };

  return (
    <GroupList
      groupList={groupList}
      fn={handleSelectGroup}
      modalFn={deleteNPlaceGroup}
    />
  );
};
