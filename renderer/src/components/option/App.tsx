import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { OptionPlace } from "./OptionPlace";
import { OptionShopping } from "./OptionShopping";
import { OptionCoupang } from "./OptionCoupang";
import { OptionCommon } from "./OptionCommon";

export const App = () => {
  return (
    <Tabs isManual variant="enclosed">
      <TabList>
        <Tab>공통</Tab>
        <Tab>플레이스</Tab>
        <Tab>쇼핑</Tab>
        <Tab>쿠팡</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <OptionCommon />
        </TabPanel>
        <TabPanel>
          <OptionPlace />
        </TabPanel>
        <TabPanel>
          <OptionShopping />
        </TabPanel>
        <TabPanel>
          <OptionCoupang />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
