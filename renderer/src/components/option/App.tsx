import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { OptionCommon } from "./OptionCommon";
import { OptionMultiCountLogic } from "@/components/option/OptionMultiCountLogic";

export const App = () => {
  return (
    <Tabs isManual variant="enclosed">
      <TabList>
        <Tab>공통</Tab>
        <Tab>프로그램</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <OptionCommon />
        </TabPanel>
        <TabPanel>
          <OptionMultiCountLogic />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
