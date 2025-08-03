import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useSnapshot } from "valtio/react";
import { storeFingerPrintRegister } from "@/valtio/fingerPrint.register.valtio";

export function NetworkType() {
  const { fingerPrintNetworkType } = useSnapshot(storeFingerPrintRegister);

  const handleChange = (e) => {
    storeFingerPrintRegister.fingerPrintNetworkType = e;
  };
  return (
    <Flex>
      <Box>
        <FormControl>
          <FormLabel>네트워크 타입선택</FormLabel>
          <Box display={"flex"}>
            <RadioGroup
              defaultValue={fingerPrintNetworkType}
              onChange={handleChange}
            >
              <Stack spacing={5} direction="row">
                {/*<Radio colorScheme="red" value="LOCAL">*/}
                {/*  로컬(테더링)*/}
                {/*</Radio>*/}
                <Radio colorScheme="blue" value="YOODOOPROXY">
                  너두프록시
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
          <FormHelperText>
            지문 오픈시 네트워크 타입을 선택합니다.
          </FormHelperText>
        </FormControl>
      </Box>
    </Flex>
  );
}
