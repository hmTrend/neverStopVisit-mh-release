"use client";

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from "@chakra-ui/react";
import { FingerprintCreateGroup } from "@/components/register/fingerprint/FingerprintCreateGroup";
import { FingerprintGroupList } from "@/components/register/fingerprint/FingerprintGroupList";
import { FingerprintCreateExcel } from "@/components/register/fingerprint/FingerprintCreateExcel";
import { FingerprintExcelList } from "@/components/register/fingerprint/FingerprintExcelList";

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
          <Flex direction={"column"} gap={3}>
            <FingerprintCreateGroup />
            <FingerprintGroupList />
            <FingerprintCreateExcel />
            <FingerprintExcelList />
          </Flex>
        </TabPanel>
        <TabPanel>a</TabPanel>
        <TabPanel>c</TabPanel>
        <TabPanel>bs</TabPanel>
      </TabPanels>
    </Tabs>
  );
};
