import { useRef } from "react";
import { CreateGroup } from "@/components/register/_commons/CreateGroup";
import { useCreateNShoppingGroup } from "@/hook/nShopping/useCreateNShoppingGroup";
import { storeNShopping } from "@/valtio/nShopping.register.valtio";

export const CreateGroupLogic = ({ id, selectedGroupName }) => {
  const inputRef = useRef(null);
  const { createNShoppingGroup } = useCreateNShoppingGroup();

  const handleCreateGroup = async () => {
    try {
      const { data } = await createNShoppingGroup({
        groupName: inputRef.current.value,
        memberFid: id,
      });
      storeNShopping.selectedGroupName = inputRef.current.value;
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <CreateGroup
      fn={handleCreateGroup}
      ref={inputRef}
      loading={false}
      title={"쇼핑"}
    />
  );
};
