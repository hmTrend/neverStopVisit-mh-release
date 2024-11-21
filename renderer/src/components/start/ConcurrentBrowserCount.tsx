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

export const ConcurrentBrowserCount = () => {
  const handleChange = (valueString, valueNumber) => {
    console.log("Number Value:", valueNumber);
    storeStart.nShopping.concurrentBrowserCount = valueNumber;
  };

  return (
    <Flex gap={3} alignItems={"center"} wrap={"nowrap"}>
      <Text whiteSpace={"nowrap"}>{"멀티"}</Text>
      <Box>
        <NumberInput min={1} max={1} w={"75px"} onChange={handleChange}>
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
