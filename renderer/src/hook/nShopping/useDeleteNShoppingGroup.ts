import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { useSnapshot } from "valtio/react";
import { gqlDeleteNShoppingGroup } from "@/lib/graphql/n-shopping-apollo";
import { storeNShopping } from "@/valtio/nShopping.register.valtio";

export const useDeleteNShoppingGroup = () => {
  const [DeleteNShoppingGroup] = useMutation(gqlDeleteNShoppingGroup);
  const toast = useToast();
  const { groupList } = useSnapshot(storeNShopping);

  const deleteNShoppingGroup = async ({ groupFid }) => {
    const { errors } = await DeleteNShoppingGroup({
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
    storeNShopping.groupList = groupList.filter(
      (v: any) => v._id !== groupFid,
    ) as any;
    toast({
      title: "그룹삭제 성공",
      isClosable: true,
      duration: 3000,
      status: "success",
    });
  };
  return { deleteNShoppingGroup };
};
