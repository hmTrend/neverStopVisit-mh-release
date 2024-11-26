import { useRef } from "react";
import { CreateGroup } from "@/components/register/_commons/CreateGroup";
import { storeNPlace } from "@/valtio/nPlace.register.valtio";
import { useCreateNPlaceGroup } from "@/hook/nPlace/useCreateNPlaceeGroup";
// import { useCreateNPlaceeGroup } from "@/hook/nShopping/useCreateNPlaceGroup";
// import { storeNPlace } from "@/valtio/nShopping.register.valtio";

export const CreateGroupLogic = ({ id, selectedGroupName }) => {
  const inputRef = useRef(null);
  const { createNPlaceGroup } = useCreateNPlaceGroup();

  const handleCreateGroup = async () => {
    try {
      console.log("id");
      console.log(id);
      console.log("selectedGroupName");
      console.log(inputRef.current.value);
      const { data } = await createNPlaceGroup({
        groupName: inputRef.current.value,
        memberFid: id,
      });
      storeNPlace.selectedGroupName = inputRef.current.value;
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <CreateGroup
      fn={handleCreateGroup}
      ref={inputRef}
      loading={false}
      title={"플레이스"}
    />
  );
};
