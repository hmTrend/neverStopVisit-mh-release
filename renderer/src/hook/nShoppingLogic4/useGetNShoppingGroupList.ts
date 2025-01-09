import { useLazyQuery } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { gqlGetNShoppingLogicGroupList } from "@/lib/graphql/n-shoppingLogic4-apollo";

export const useGetNShoppingGroupList = () => {
  const [GetNShoppingGroupList] = useLazyQuery(gqlGetNShoppingLogicGroupList, {
    variables: { input: { memberFid: "67315a7130d6d4d2bb26e38a" } },
    fetchPolicy: "no-cache",
  });
  const toast = useToast();

  const getNShoppingGroupList = async () => {
    const { data, error } = await GetNShoppingGroupList({
      variables: { input: { memberFid: "67315a7130d6d4d2bb26e38a" } },
      fetchPolicy: "no-cache",
    });

    if (error) {
      toast({
        title: "그룹리스트 가져오기 실패",
        isClosable: true,
        duration: 3000,
        status: "error",
      });
      return;
    }
    if (!data) {
      return;
    }
    return { data: data.getNShoppingLogicGroupList.data };
  };

  return { getNShoppingGroupList };
};
