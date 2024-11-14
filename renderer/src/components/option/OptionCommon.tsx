"use client";

import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useSnapshot } from "valtio/react";
import { storeOption } from "@/valtio/option.valtio";

export const OptionCommon = () => {
  const { common } = useSnapshot(storeOption);

  return (
    <Flex>
      <Box>
        <FormControl as="fieldset">
          <FormLabel as="legend" fontSize={"xl"}>
            IP 교체방식
          </FormLabel>
          <RadioGroup value={common.ipChangeType}>
            <HStack spacing="24px">
              <Radio value="STATIC">고정</Radio>
              <Radio value="TETHERING">테더링</Radio>
              <Radio value="ROUTER">라우터</Radio>
              <Radio value="LOCAL">로컬</Radio>
            </HStack>
          </RadioGroup>
          <FormHelperText>IP 작업방식</FormHelperText>
        </FormControl>
      </Box>
    </Flex>
  );
};
