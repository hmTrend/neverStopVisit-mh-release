"use client";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { App as AppFingerprint } from "@/components/register/fingerprint/App";
import { App as AppNShopping } from "@/components/register/nShopping/App";
import { App as AppNPlace } from "@/components/register/nPlace/App";

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
        <TabPanel>
          <AppNPlace />
        </TabPanel>
        <TabPanel>
          <AppNShopping />
        </TabPanel>
        <TabPanel>bs</TabPanel>
      </TabPanels>
    </Tabs>
  );
};
