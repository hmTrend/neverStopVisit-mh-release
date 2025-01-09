import { GroupList } from "@/components/register/_commons/GroupList";
import { useEffect, useState } from "react";
import { storeNShopping } from "@/valtio/nShopping.register.valtio";
import { useGetNShoppingGroupList } from "@/hook/nShoppingLogic4/useGetNShoppingGroupList";
import { useDeleteNShoppingGroup } from "@/hook/nShoppingLogic4/useDeleteNShoppingGroup";

export const GroupListLogic4 = ({ selectedGroupName, selectedExcelList }) => {
  const { getNShoppingGroupList } = useGetNShoppingGroupList();
  const [groupList, setGroupList] = useState([]);
  const { deleteNShoppingGroup } = useDeleteNShoppingGroup();

  const GetNShoppingGroupList = async () => {
    const { data } = await getNShoppingGroupList();
    setGroupList(data);
    storeNShopping.groupList = data;
  };

  useEffect(() => {
    GetNShoppingGroupList();
  }, [selectedGroupName, selectedExcelList]);

  const handleSelectGroup = ({ groupId, groupName }) => {
    storeNShopping.selectedGroupId = groupId;
    storeNShopping.selectedGroupName = groupName;
  };

  return (
    <GroupList
      groupList={groupList}
      fn={handleSelectGroup}
      modalFn={deleteNShoppingGroup}
    />
  );
};
