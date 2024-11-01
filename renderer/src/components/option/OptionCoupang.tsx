import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

export const OptionCoupang = () => {
  return (
    <Flex>
      <Box>
        <FormControl as="fieldset">
          <FormLabel as="legend" fontSize={"xl"}>
            쿠팡 멀티동작갯수
          </FormLabel>
          <NumberInput defaultValue={1} min={1} max={2}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText>같은 IP에서 동시에 작업될 쿠팡</FormHelperText>
        </FormControl>
      </Box>
    </Flex>
  );
};
