import { Flex } from "@chakra-ui/react";
import { useSnapshot } from "valtio/react";
import { storeNShopping } from "@/valtio/nShopping.register.valtio";
import { storeAuth } from "@/valtio/member.valtio";
import { CreateExcelLogic4 } from "@/components/register/nShoppingLogic4/CreateExcelLogic4";
import { CreateGroupLogic4 } from "@/components/register/nShoppingLogic4/CreateGroupLogic4";
import { GroupListLogic4 } from "@/components/register/nShoppingLogic4/GroupListLogic4";
import { ExcelListLogic4 } from "@/components/register/nShoppingLogic4/ExcelListLogic4";

export const App = () => {
  const { userId } = useSnapshot(storeAuth);
  const { selectedGroupName, groupList, selectedExcelList } =
    useSnapshot(storeNShopping);
  return (
    <Flex direction={"column"} gap={3}>
      <CreateGroupLogic4 id={userId} selectedGroupName={selectedGroupName} />
      <GroupListLogic4
        selectedGroupName={selectedGroupName}
        selectedExcelList={selectedExcelList}
      />
      <CreateExcelLogic4 />
      <ExcelListLogic4 />
    </Flex>
  );
};
