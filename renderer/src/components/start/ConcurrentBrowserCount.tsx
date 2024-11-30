import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Box,
  Text,
} from "@chakra-ui/react";
import { storeStart } from "@/valtio/start.valtio";
import { useSnapshot } from "valtio/react";

export const ConcurrentBrowserCount = ({ selectProgram }) => {
  const snapStart = useSnapshot(storeStart);
  const handleChange = (valueString, valueNumber) => {
    console.log("Number Value:", valueNumber);
    storeStart[selectProgram].concurrentBrowserCount = valueNumber;
  };

  return (
    <Flex gap={3} alignItems={"center"} wrap={"nowrap"}>
      <Text whiteSpace={"nowrap"}>{"멀티"}</Text>
      <Box>
        <NumberInput
          min={1}
          max={1}
          w={"75px"}
          onChange={handleChange}
          defaultValue={snapStart[selectProgram].concurrentBrowserCount}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
    </Flex>
  );
};
