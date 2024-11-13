import { GroupList } from "@/components/register/_commons/GroupList";
import { useGetNShoppingGroupList } from "@/hook/nShopping/useGetNShoppingGroupList";
import { useEffect, useState } from "react";
import { storeNShopping } from "@/valtio/nShopping.register.valtio";
import { useDeleteNShoppingGroup } from "@/hook/nShopping/useDeleteNShoppingGroup";
import { GroupListModal } from "@/components/register/nShopping/GroupList.modal";

export const GroupListLogic = ({ selectedGroupName, selectedExcelList }) => {
  const { getNShoppingGroupList } = useGetNShoppingGroupList();
  const [groupList, setGroupList] = useState([]);
  const { deleteNShoppingGroup } = useDeleteNShoppingGroup();

  const GetNShoppingGroupList = async () => {
    const { data } = await getNShoppingGroupList();
    setGroupList(data.getNShoppingGroupList.data);
  };

  useEffect(() => {
    GetNShoppingGroupList();
  }, [selectedGroupName, selectedExcelList]);

  return <GroupList groupList={groupList} fn={deleteNShoppingGroup} />;
};
