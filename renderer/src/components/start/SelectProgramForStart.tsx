import { Flex, Select, Text } from "@chakra-ui/react";

export const SelectProgramForStart = ({
  selectProgram,
  getSavedValue,
  handleSelectChange,
}) => {
  return (
    <Flex direction={"column"} gap={3}>
      {selectProgram.map((v: any, i) => (
        <TargetSelect
          key={i}
          selectProgram={v}
          getSavedValue={getSavedValue}
          handleSelectChange={handleSelectChange}
        />
      ))}
    </Flex>
  );
};

function TargetSelect({ getSavedValue, selectProgram, handleSelectChange }) {
  console.log("getSavedValue() 11111");
  console.log(getSavedValue());
  return (
    <Flex gap={3} alignItems={"center"} wrap={"nowrap"}>
      <Text whiteSpace={"nowrap"}>{selectProgram.title}</Text>
      <Select
        placeholder="작업할 그룹선택"
        defaultValue={getSavedValue(
          selectProgram.title,
          selectProgram.groupList,
        )}
        onChange={(e) => handleSelectChange(e, selectProgram.title)}
      >
        {selectProgram.groupList.map((v: any, i) => (
          <option key={i} value={v._id}>
            {v.groupName}
          </option>
        ))}
      </Select>
    </Flex>
  );
}
