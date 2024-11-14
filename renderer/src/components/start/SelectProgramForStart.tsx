import { Box, Flex, Select, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import { FingerPrintSelect } from "@/components/start/FingerPrintSelect";

export const SelectProgramForStart = ({
  selectProgram,
  handleSelectChange,
  groupList,
}) => {
  return (
    <Flex direction={"column"} gap={3}>
      <Fragment>
        <Flex gap={6}>
          <TargetSelect
            selectProgram={selectProgram}
            groupList={groupList}
            handleSelectChange={handleSelectChange}
          />
          <FingerPrintSelect
            selectProgram={selectProgram}
            groupList={groupList}
          />
        </Flex>
      </Fragment>
    </Flex>
  );
};

function TargetSelect({ selectProgram, handleSelectChange, groupList }) {
  return (
    <Flex gap={3} alignItems={"center"} wrap={"nowrap"}>
      <Text whiteSpace={"nowrap"}>{selectProgram}</Text>
      <Box>
        <Select
          placeholder="작업할 그룹선택"
          onChange={(e) => handleSelectChange(e)}
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
}
