import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useCreateFingerPrintGroup } from "@/hook/fingerPrint/useCreateFingerPrintGroup";
import { storeFingerPrintRegister } from "@/valtio/fingerPrint.register.valtio";
import { useSnapshot } from "valtio/react";

export const FingerprintCreateGroup = () => {
  const groupNameRef = useRef<HTMLInputElement>(null);
  const { createFingerPrintGroup } = useCreateFingerPrintGroup();
  const [loading, setLoading] = useState(false);
  const { groupList } = useSnapshot(storeFingerPrintRegister);
  const toast = useToast();

  const handleSubmit = async () => {
    const groupName = groupNameRef?.current?.value;
    console.log(2);
    console.log(groupList);
    try {
      isSameGroup({ payload: groupList, groupName });
      console.log(3);
    } catch (e) {
      console.log(4);
      console.error(e.message);
      return;
    }
    setLoading(true);
    console.log(1);
    const { data } = await createFingerPrintGroup({
      groupName,
      memberFid: "67315a7130d6d4d2bb26e38a",
    });
    console.log("data 33211");
    console.log(data);
    storeFingerPrintRegister.groupList.push(data);
    setLoading(false);
  };
  return (
    <Flex>
      <Box>
        <FormControl>
          <FormLabel>그룹 만들기</FormLabel>
          <Box display={"flex"}>
            <Input type="email" ref={groupNameRef} />
            <Button onClick={handleSubmit} isLoading={loading}>
              지문 그룹생성
            </Button>
          </Box>
          <FormHelperText>새로운 그룹을 생성합니다.</FormHelperText>
        </FormControl>
      </Box>
    </Flex>
  );

  function isSameGroup({ payload, groupName }) {
    const getGroupName = payload.some((v: any) => v.groupName === groupName);
    if (getGroupName) {
      toast({
        title: "이미 생성된 그룹",
        isClosable: true,
        duration: 3000,
        status: "error",
      });
      throw Error("이미 생성된 그룹");
    }
  }
};
