import { useRef } from "react";
import { CreateGroup } from "@/components/register/_commons/CreateGroup";

export const CreateGroupLogic = () => {
  const inputRef = useRef(null);

  const handleCreateGroup = () => {
    console.log(inputRef.current.value);
  };
  return <CreateGroup fn={handleCreateGroup} ref={inputRef} loading={false} />;
};
