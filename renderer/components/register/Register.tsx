import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from "@chakra-ui/react";
import { RegisterPersonalMarkCreateGroup } from "./RegisterPersonalMarkCreateGroup";
import { RegisterPersonalMarkGetGroupList } from "./RegisterPersonalMarkGetGroupList";
import { RegisterPersonalMarkGetList } from "./RegisterPersonalMarkGetList";
import { RegisterPersonalMarkCreateExcel } from "./RegisterPersonalMarkCreateExcel";

export const Register = () => {
  return (
    <Tabs isManual variant="enclosed">
      <TabList>
        <Tab>퍼스널마크</Tab>
        <Tab>플레이스</Tab>
        <Tab>쇼핑</Tab>
        <Tab>쿠팡</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Flex direction={"column"} gap={3}>
            <RegisterPersonalMarkCreateGroup />
            <RegisterPersonalMarkGetGroupList />
            <RegisterPersonalMarkCreateExcel />
            <RegisterPersonalMarkGetList />
          </Flex>
        </TabPanel>
        <TabPanel>a</TabPanel>
        <TabPanel>c</TabPanel>
        <TabPanel>bs</TabPanel>
      </TabPanels>
    </Tabs>
  );
};
