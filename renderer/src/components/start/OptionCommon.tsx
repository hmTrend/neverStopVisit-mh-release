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
import { storeStart } from "@/valtio/start.valtio";
import { useSnapshot } from "valtio/react";

export const OptionCommon = () => {
  const snapStart = useSnapshot(storeStart);
  const handleChange = (value) => {
    storeStart.common.ip = value;
  };

  return (
    <Flex>
      <Box>
        <FormControl as="fieldset">
          <FormLabel as="legend" fontSize={"xl"}>
            IP 교체방식
          </FormLabel>
          <RadioGroup
            onChange={handleChange}
            defaultValue={snapStart.common.ip}
          >
            <HStack spacing="24px">
              <Radio value="STATIC">고정</Radio>
              <Radio value="TETHERING">테더링</Radio>
              <Radio value="ROUTER">라우터</Radio>
              <Radio value="LOCAL">로컬</Radio>
              <Radio value="PROXY">프록시</Radio>
            </HStack>
          </RadioGroup>
          <FormHelperText>IP 작업방식</FormHelperText>
        </FormControl>
      </Box>
    </Flex>
  );
};
