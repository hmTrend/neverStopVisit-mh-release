"use client";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { App as AppFingerprint } from "@/components/register/fingerprint/App";

export const App = () => {
  return (
    <Tabs isManual variant="enclosed">
      <TabList>
        <Tab>지문</Tab>
        <Tab>플레이스</Tab>
        <Tab>쇼핑</Tab>
        <Tab>쿠팡</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <AppFingerprint />
        </TabPanel>
        <TabPanel>a</TabPanel>
        <TabPanel>c</TabPanel>
        <TabPanel>bs</TabPanel>
      </TabPanels>
    </Tabs>
  );
};
