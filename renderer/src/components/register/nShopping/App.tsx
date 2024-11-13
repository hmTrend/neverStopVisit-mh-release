import { Flex } from "@chakra-ui/react";
import { CreateGroupLogic } from "@/components/register/nShopping/CreateGroupLogic";
import { useSnapshot } from "valtio/react";
import { storeMember } from "@/valtio/member.valtio";
import { GroupListLogic } from "@/components/register/nShopping/GroupListLogic";
import { storeNShopping } from "@/valtio/nShopping.register.valtio";

export const App = () => {
  const { id } = useSnapshot(storeMember);
  const { selectedGroupName, groupList } = useSnapshot(storeNShopping);
  return (
    <Flex direction={"column"} gap={3}>
      <CreateGroupLogic id={id} selectedGroupName={selectedGroupName} />
      <GroupListLogic
        groupList={groupList}
        selectedGroupName={selectedGroupName}
      />
    </Flex>
  );
};
