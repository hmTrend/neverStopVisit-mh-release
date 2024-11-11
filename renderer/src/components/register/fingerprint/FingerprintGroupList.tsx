import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useSuspenseQuery } from "@apollo/client";
import { gqlGetFingerPrintGroupList } from "@/lib/graphql/finger-print.apollo";
import { useEffect } from "react";
import { storeRegister } from "@/valtio/register.valtio";
import { useSnapshot } from "valtio/react";

export const FingerprintGroupList = () => {
  const { data, error } = useSuspenseQuery(gqlGetFingerPrintGroupList, {
    variables: { input: { memberFid: "67315a7130d6d4d2bb26e38a" } },
  });
  const toast = useToast();
  const { groupList } = useSnapshot(storeRegister);

  useEffect(() => {
    if (error) {
      toast({
        title: "그룹리스트 가져오기 실패",
        isClosable: true,
        duration: 3000,
        status: "error",
      });
      return;
    }
    console.log(data.getFingerPrintGroupList.data);
    storeRegister.groupList = data.getFingerPrintGroupList.data;
  }, []);
  return (
    <Flex>
      <Box>
        <FormControl>
          <FormLabel>생성된 그룹리스트</FormLabel>
          <Flex wrap={"wrap"} gap={3}>
            {groupList.map((v: any, i: number) => (
              <Box
                key={i}
                border="1px solid black"
                display={"flex"}
                alignItems={"center"}
              >
                <Button>{v.groupName}</Button>
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  bg="white"
                  color="black"
                  onClick={() => alert("Edit button clicked!")}
                />
                <IconButton
                  aria-label="Delete"
                  icon={<CloseIcon />}
                  onClick={() => alert("Delete button clicked!")}
                  bg="white"
                  color="black"
                  size={"sm"}
                />
              </Box>
            ))}
          </Flex>
          <FormHelperText>생성된 그룹 리스트를 선택합니다.</FormHelperText>
        </FormControl>
      </Box>
    </Flex>
  );
};
