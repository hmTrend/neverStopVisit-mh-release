import { GroupList } from "@/components/register/_commons/GroupList";
import { useGetNShoppingGroupList } from "@/hook/nShopping/useGetNShoppingGroupList";
import { useEffect, useState } from "react";
import { storeNShopping } from "@/valtio/nShopping.register.valtio";

export const GroupListLogic = ({ selectedGroupName }) => {
  const { getNShoppingGroupList } = useGetNShoppingGroupList();
  const [groupList, setGroupList] = useState([]);

  const GetNShoppingGroupList = async () => {
    const { data } = await getNShoppingGroupList();
    setGroupList(data.getNShoppingGroupList.data);
  };

  useEffect(() => {
    GetNShoppingGroupList();
  }, [selectedGroupName]);

  return <GroupList groupList={groupList} />;
};
