import { Box, Flex, Select, Text } from "@chakra-ui/react";
import { useSnapshot } from "valtio/react";
import { storeFingerPrintRegister } from "@/valtio/fingerPrint.register.valtio";

export const FingerPrintSelect = ({ selectProgram }) => {
  const { groupList } = useSnapshot(storeFingerPrintRegister);

  const handleSelectChange = (e, programTitle) => {
    const selectedValue = e.target.value;
    const storageKey = `selectedFingerPrint_${programTitle}`;
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
