import { Flex, Select, Text } from "@chakra-ui/react";

export const SelectProgramForStart = () => {
  return (
    <Flex>
      <TargetSelect />
    </Flex>
  );
};

function TargetSelect({
  title = "타이틀",
  selectOption = [
    { k: "k1", v: "v1" },
    { k: "k2", v: "v2" },
    { k: "k3", v: "v3" },
  ],
}) {
  return (
    <Flex gap={3} alignItems={"center"} wrap={"nowrap"}>
      <Text whiteSpace={"nowrap"}>{title}</Text>
      <Select placeholder="작업할 그룹선택" defaultValue="v2">
        {selectOption.map((v: any, i) => (
          <option key={i} value={v.v}>
            {v.v}
          </option>
        ))}
      </Select>
    </Flex>
  );
}
