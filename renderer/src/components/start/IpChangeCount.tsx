"use client";

import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { storeStart } from "@/valtio/start.valtio";
import { useSnapshot } from "valtio/react";

export function IpChangeCount() {
  const snapStart = useSnapshot(storeStart);
  const handleChange = (value) => {
    storeStart.common.ipChangeCount = value;
  };

  return (
    <Flex>
      <Box>
        <FormControl as="fieldset">
          <FormLabel as="legend" fontSize={"xl"}>
            IP 교체주기
          </FormLabel>
          <NumberInput
            value={snapStart.common.ipChangeCount}
            min={1}
            max={10}
            step={1}
            onChange={handleChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText>IP 작업방식</FormHelperText>
        </FormControl>
      </Box>
    </Flex>
  );
}
