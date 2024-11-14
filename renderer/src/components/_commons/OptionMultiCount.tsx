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

export const OptionMultiCount = ({
  multiCount,
  handleChange,
  getSavedValue,
}) => {
  return (
    <Flex gap={6}>
      {multiCount.map((v: any, i) => (
        <Box key={i}>
          <FormControl as="fieldset">
            <FormLabel as="legend" fontSize={"xl"}>
              {v.title} 멀티동작갯수
            </FormLabel>
            <NumberInput
              defaultValue={getSavedValue(v.title)}
              min={1}
              max={2}
              onChange={(value) => handleChange(value, v.title)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormHelperText>
              동시에 작업될 {v.title} 브라우저 갯수
            </FormHelperText>
          </FormControl>
        </Box>
      ))}
    </Flex>
  );
};
