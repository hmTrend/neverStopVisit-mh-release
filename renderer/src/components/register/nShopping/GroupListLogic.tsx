import { GroupList } from "@/components/register/_commons/GroupList";
import { useGetNShoppingGroupList } from "@/hook/nShopping/useGetNShoppingGroupList";
import { useEffect, useState } from "react";
import { useDeleteNShoppingGroup } from "@/hook/nShopping/useDeleteNShoppingGroup";
import { storeFingerPrintRegister } from "@/valtio/fingerPrint.register.valtio";
import { storeNShopping } from "@/valtio/nShopping.register.valtio";

export const GroupListLogic = ({ selectedGroupName, selectedExcelList }) => {
  const { getNShoppingGroupList } = useGetNShoppingGroupList();
  const [groupList, setGroupList] = useState([]);
  const { deleteNShoppingGroup } = useDeleteNShoppingGroup();

  const GetNShoppingGroupList = async () => {
    const { data } = await getNShoppingGroupList();
    setGroupList(data);
  };

  useEffect(() => {
    GetNShoppingGroupList();
  }, [selectedGroupName, selectedExcelList]);

  const handleSelectGroup = ({ groupId, groupName }) => {
    storeNShopping.selectedGroupId = groupId;
    storeNShopping.selectedGroupName = groupName;
    console.log(groupId);
    console.log(groupName);
  };

  return (
    <GroupList
      groupList={groupList}
      fn={handleSelectGroup}
      modalFn={deleteNShoppingGroup}
    />
  );
};
