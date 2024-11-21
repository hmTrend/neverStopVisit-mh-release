import { Flex } from "@chakra-ui/react";
import { CreateGroupLogic } from "@/components/register/nShopping/CreateGroupLogic";
import { useSnapshot } from "valtio/react";
import { GroupListLogic } from "@/components/register/nShopping/GroupListLogic";
import { storeNShopping } from "@/valtio/nShopping.register.valtio";
import { CreateExcelLogic } from "@/components/register/nShopping/CreateExcelLogic";
import { ExcelListLogic } from "@/components/register/nShopping/ExcelListLogic";
import { storeAuth } from "@/valtio/member.valtio";

export const App = () => {
  const { userId } = useSnapshot(storeAuth);
  const { selectedGroupName, groupList, selectedExcelList } =
    useSnapshot(storeNShopping);
  return (
    <Flex direction={"column"} gap={3}>
      <CreateGroupLogic id={userId} selectedGroupName={selectedGroupName} />
      <GroupListLogic
        selectedGroupName={selectedGroupName}
        selectedExcelList={selectedExcelList}
      />
      <CreateExcelLogic />
      <ExcelListLogic />
    </Flex>
  );
};
