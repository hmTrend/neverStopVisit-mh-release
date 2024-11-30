import { Box, Flex, Select, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import { FingerPrintSelect } from "@/components/start/FingerPrintSelect";
import { StartStateSwitch } from "@/components/start/StartStateSwitch";
import { ConcurrentBrowserCount } from "@/components/start/ConcurrentBrowserCount";
import { useSnapshot } from "valtio/react";
import { storeStart } from "@/valtio/start.valtio";

export const SelectProgramForStart = ({
  selectProgram,
  handleSelectChange,
  groupList,
}) => {
  return (
    <Flex direction={"column"} gap={3}>
      <Fragment>
        <Flex gap={6}>
          <StartStateSwitch selectProgram={selectProgram} />
          <TargetSelect
            selectProgram={selectProgram}
            groupList={groupList}
            handleSelectChange={handleSelectChange}
          />
          <FingerPrintSelect selectProgram={selectProgram} />
          {/*<ConcurrentOneLineWork />*/}
          <ConcurrentBrowserCount selectProgram={selectProgram} />
        </Flex>
      </Fragment>
    </Flex>
  );
};

function TargetSelect({ selectProgram, handleSelectChange, groupList }) {
  const snap = useSnapshot(storeStart);

  return (
    <Flex gap={3} alignItems={"center"} wrap={"nowrap"}>
      <Text whiteSpace={"nowrap"}>{selectProgram}</Text>
      <Box>
        <Select
          placeholder="작업할 그룹선택"
          onChange={handleSelectChange}
          defaultValue={snap[selectProgram].selectedGroup.groupId}
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
