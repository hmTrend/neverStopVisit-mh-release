import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

export const FingerprintExcelListDataListCount = ({ onCountChange }) => {
  return (
    <RadioGroup defaultValue="100" onChange={onCountChange}>
      <Stack spacing={5} direction="row">
        <Radio colorScheme="green" value="100">
          100개
        </Radio>
        <Radio colorScheme="yellow" value="250">
          250개
        </Radio>
        <Radio colorScheme="purple" value="500">
          500개
        </Radio>
        <Radio colorScheme="blue" value="1000">
          1,000개
        </Radio>
        <Radio colorScheme="red" value="10000">
          전체보기
        </Radio>
      </Stack>
    </RadioGroup>
  );
};
