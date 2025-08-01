import { Box, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function MainTopMenu() {
  const [tabIndex, setTabIndex] = useState(0);
  const router = useRouter();

  const handleSliderChange = (event) => {
    setTabIndex(parseInt(event.target.value, 10));
  };

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
    <Box>
      <input
        style={{ width: "180px" }}
        type="range"
        min="0"
        max="2"
        value={tabIndex}
        onChange={handleSliderChange}
      />

      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList>
          <Tab onClick={() => router.push("/")}>메인</Tab>
          <Tab onClick={() => router.push("/register")}>등록</Tab>
          {/*<Tab onClick={() => router.push("/start")}>시작</Tab>*/}
        </TabList>
      </Tabs>
    </Box>
  );
}
