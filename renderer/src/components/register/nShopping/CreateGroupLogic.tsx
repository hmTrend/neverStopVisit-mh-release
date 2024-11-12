import { useRef } from "react";
import { CreateGroup } from "@/components/register/_commons/CreateGroup";
import { useCreateNShoppingGroup } from "@/hook/nShopping/useCreateNShoppingGroup";

export const CreateGroupLogic = ({ id }) => {
  const inputRef = useRef(null);
  const { createNShoppingGroup } = useCreateNShoppingGroup();

  const handleCreateGroup = async () => {
    try {
      console.log(inputRef.current.value);
      const { data } = await createNShoppingGroup({
        groupName: inputRef.current.value,
        memberFid: id,
      });
      console.log("data 333");
      console.log(data);
    } catch (e) {
      console.error(e.message);
    }
  };
  return <CreateGroup fn={handleCreateGroup} ref={inputRef} loading={false} />;
};
