import { GroupList } from "@/components/register/_commons/GroupList";
import { useGetNShoppingGroupList } from "@/hook/nShopping/useGetNShoppingGroupList";
import { useEffect, useState } from "react";
import { useDeleteNShoppingGroup } from "@/hook/nShopping/useDeleteNShoppingGroup";
import { storeNShopping } from "@/valtio/nShopping.register.valtio";
import { storeStart } from "@/valtio/start.valtio";

export const GroupListLogic = ({ selectedGroupName, selectedExcelList }) => {
  const { getNShoppingGroupList } = useGetNShoppingGroupList();
  const [groupList, setGroupList] = useState([]);
  const { deleteNShoppingGroup } = useDeleteNShoppingGroup();

  const GetNShoppingGroupList = async () => {
    const { data } = await getNShoppingGroupList();
    setGroupList(data);
    console.log("data 123123");
    console.log(data);
    storeStart.selectProgram[0] = { title: "쇼핑", groupList: data };
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
