import { Box, Flex, Select, Text } from "@chakra-ui/react";
import { useSnapshot } from "valtio/react";
import { storeFingerPrintRegister } from "@/valtio/fingerPrint.register.valtio";
import { storeStart } from "@/valtio/start.valtio";

export const FingerPrintSelect = ({ selectProgram }) => {
  const { groupList } = useSnapshot(storeFingerPrintRegister);

  const handleSelectChange = (e, programTitle) => {
    const groupId = e.target.value;
    const selectedOption = e.target.options[e.target.selectedIndex];
    const groupName = selectedOption.text; // 선택된 option의 텍스트(groupName) 가져오기

    console.log("groupId");
    console.log(groupId);
    console.log("groupName");
    console.log(groupName);
    storeStart.nShopping.fingerPrint = { groupId, groupName };
  };

  return (
    <Flex gap={3} alignItems={"center"} wrap={"nowrap"}>
      <Text whiteSpace={"nowrap"}>{"지문"}</Text>
      <Box>
        <Select
          placeholder="작업할 지문선택"
          onChange={(e) => handleSelectChange(e, selectProgram.title)}
        >
          {groupList.map((v: any, i) => (
            <option key={i} value={v._id}>
              {v.groupName}
            </option>
          ))}
        </Select>
      </Box>
    </Flex>
  );
};
