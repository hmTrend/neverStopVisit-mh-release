import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { useSnapshot } from "valtio/react";
import { storeNShopping } from "@/valtio/nShopping.register.valtio";
import { gqlDeleteNShoppingLogic4Group } from "@/lib/graphql/n-shoppingLogic4-apollo";

export const useDeleteNShoppingGroup = () => {
  const [DeleteNShoppingGroup] = useMutation(gqlDeleteNShoppingLogic4Group);
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
      throw Error("ERR > deleteNShoppingGroup");
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
