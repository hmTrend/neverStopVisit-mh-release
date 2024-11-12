import { Flex } from "@chakra-ui/react";
import { CreateGroupLogic } from "@/components/register/nShopping/CreateGroupLogic";
import { useSnapshot } from "valtio/react";
import { storeMember } from "@/valtio/member.valtio";

export const App = () => {
  const { id } = useSnapshot(storeMember);
  return (
    <Flex>
      <CreateGroupLogic id={id} />
    </Flex>
  );
};
