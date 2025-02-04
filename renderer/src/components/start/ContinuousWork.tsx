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

export const ContinuousWork = ({ selectProgram }) => {
  const snapStart = useSnapshot(storeStart);
  const handleChange = (valueString, valueNumber) => {
    console.log("Number Value:", valueNumber);
    storeStart[selectProgram].continuousWork = valueNumber;
  };

  return (
    <Flex gap={3} alignItems={"center"} wrap={"nowrap"}>
      <Text whiteSpace={"nowrap"}>{"연속"}</Text>
      <Box>
        <NumberInput
          min={1}
          max={10}
          w={"75px"}
          onChange={handleChange}
          defaultValue={snapStart[selectProgram]?.continuousWork}
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
