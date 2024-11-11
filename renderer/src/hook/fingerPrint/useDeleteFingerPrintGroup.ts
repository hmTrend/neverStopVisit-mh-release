import { gqlDeleteFingerPrintGroup } from "@/lib/graphql/finger-print.apollo";
import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { storeFingerPrintRegister } from "@/valtio/fingerPrint.register.valtio";
import { useSnapshot } from "valtio/react";

export const useDeleteFingerPrintGroup = () => {
  const [DeleteFingerPrintGroup] = useMutation(gqlDeleteFingerPrintGroup);
  const toast = useToast();
  const { groupList } = useSnapshot(storeFingerPrintRegister);

  const deleteFingerPrintGroup = async ({ groupFid }) => {
    const { errors } = await DeleteFingerPrintGroup({
      variables: { input: { groupFid } },
    });
    if (errors) {
      toast({
        title: "그룹삭제 실패",
        isClosable: true,
        duration: 3000,
        status: "error",
      });
      throw Error("ERR > deleteFingerPrintGroup");
    }
    storeFingerPrintRegister.groupList = groupList.filter(
      (v: any) => v._id !== groupFid,
    );
    toast({
      title: "그룹삭제 성공",
      isClosable: true,
      duration: 3000,
      status: "success",
    });
  };
  return { deleteFingerPrintGroup };
};
