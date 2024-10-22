import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import { Option } from "./option/Option";
import { Start } from "./start/Start";
import { Main } from "./main/Main";
import { useState } from "react";
import { Register } from "./register/Register";

export default function Layout({ children }) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleSliderChange = (event) => {
    setTabIndex(parseInt(event.target.value, 10));
  };

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
    <div>
      <header>
        <Box>
          <input
            type="range"
            min="0"
            max="3"
            value={tabIndex}
            onChange={handleSliderChange}
          />

          <Tabs index={tabIndex} onChange={handleTabsChange}>
            <TabList>
              <Tab>메인</Tab>
              <Tab>옵션</Tab>
              <Tab>등록</Tab>
              <Tab>시작</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Main />
              </TabPanel>
              <TabPanel>
                <Option />
              </TabPanel>
              <TabPanel>
                <Register />
              </TabPanel>
              <TabPanel>
                <Start />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </header>
      <main>{children}</main>
      <footer>footer</footer>
    </div>
  );
}
