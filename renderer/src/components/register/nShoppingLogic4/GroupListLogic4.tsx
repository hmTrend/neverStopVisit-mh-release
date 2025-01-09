import { GroupList } from "@/components/register/_commons/GroupList";
import { useEffect, useState } from "react";
import { useGetNShoppingGroupList } from "@/hook/nShoppingLogic4/useGetNShoppingGroupList";
import { useDeleteNShoppingGroup } from "@/hook/nShoppingLogic4/useDeleteNShoppingGroup";
import { storeNShoppingLogic4 } from "@/valtio/nShoppingLogic4.register.valtio";

export const GroupListLogic4 = ({ selectedGroupName, selectedExcelList }) => {
  const { getNShoppingGroupList } = useGetNShoppingGroupList();
  const [groupList, setGroupList] = useState([]);
  const { deleteNShoppingGroup } = useDeleteNShoppingGroup();

  const GetNShoppingGroupList = async () => {
    const { data } = await getNShoppingGroupList();
    setGroupList(data);
    storeNShoppingLogic4.groupList = data;
  };

  useEffect(() => {
    GetNShoppingGroupList();
  }, [selectedGroupName, selectedExcelList]);

  const handleSelectGroup = ({ groupId, groupName }) => {
    storeNShoppingLogic4.selectedGroupId = groupId;
    storeNShoppingLogic4.selectedGroupName = groupName;
  };

  return (
    <GroupList
      groupList={groupList}
      fn={handleSelectGroup}
      modalFn={deleteNShoppingGroup}
    />
  );
};
