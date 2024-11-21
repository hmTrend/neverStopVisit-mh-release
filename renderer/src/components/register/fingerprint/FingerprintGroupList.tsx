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
import { EditIcon } from "@chakra-ui/icons";
import { useSuspenseQuery } from "@apollo/client";
import { gqlGetFingerPrintGroupList } from "@/lib/graphql/finger-print.apollo";
import { useEffect } from "react";
import { useSnapshot } from "valtio/react";
import { storeFingerPrintRegister } from "@/valtio/fingerPrint.register.valtio";
import { FingerprintGroupListModal } from "@/components/register/fingerprint/FingerprintGroupList.modal";

export const FingerprintGroupList = () => {
  const { data, error } = useSuspenseQuery(gqlGetFingerPrintGroupList, {
    variables: { input: { memberFid: "67315a7130d6d4d2bb26e38a" } },
    fetchPolicy: "no-cache",
  });
  const toast = useToast();
  const { groupList } = useSnapshot(storeFingerPrintRegister);

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
    const getData: any = data;
    storeFingerPrintRegister.groupList = getData.getFingerPrintGroupList.data;
  }, []);

  const handleSelectGroup = ({ groupId, groupName }) => {
    storeFingerPrintRegister.selectedGroupId = groupId;
    storeFingerPrintRegister.selectedGroupName = groupName;
  };
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
                <Button
                  onClick={() =>
                    handleSelectGroup({
                      groupId: v._id,
                      groupName: v.groupName,
                    })
                  }
                >
                  {v.groupName}
                </Button>
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  bg="white"
                  color="black"
                  onClick={() => alert("Edit button clicked!")}
                />
                <FingerprintGroupListModal
                  groupName={v.groupName}
                  groupFid={v._id}
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
