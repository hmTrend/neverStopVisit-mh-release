import { Box, Flex, Select, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import { FingerPrintSelect } from "@/components/start/FingerPrintSelect";
import { StartStateSwitch } from "@/components/start/StartStateSwitch";
import { ConcurrentBrowserCount } from "@/components/start/ConcurrentBrowserCount";
import { nShoppingStorage } from "@/util/localStorage";
import { ConcurrentOneLineWork } from "@/components/start/ConcurrentOneLineWork";

export const SelectProgramForStart = ({
  selectProgram,
  handleSelectChange,
  groupList,
}) => {
  return (
    <Flex direction={"column"} gap={3}>
      <Fragment>
        <Flex gap={6}>
          <StartStateSwitch />
          <TargetSelect
            selectProgram={selectProgram}
            groupList={groupList}
            handleSelectChange={handleSelectChange}
          />
          <FingerPrintSelect
            selectProgram={selectProgram}
            groupList={groupList}
          />
          {/*<ConcurrentOneLineWork />*/}
          <ConcurrentBrowserCount />
        </Flex>
      </Fragment>
    </Flex>
  );
};

function TargetSelect({ selectProgram, handleSelectChange, groupList }) {
  const getInitialValue = () => {
    const savedState = nShoppingStorage.loadState();
    return savedState.selectedGroup || { groupName: "", groupId: "" };
  };

  // 저장된 값 가져오기
  const initialValue = getInitialValue();

  return (
    <Flex gap={3} alignItems={"center"} wrap={"nowrap"}>
      <Text whiteSpace={"nowrap"}>{selectProgram}</Text>
      <Box>
        <Select
          placeholder="작업할 그룹선택"
          onChange={handleSelectChange}
          defaultValue={initialValue.groupId || ""}
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
