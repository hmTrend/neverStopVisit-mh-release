import { useLazyQuery } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { gqlGetNShoppingExcelList } from "@/lib/graphql/n-shopping-apollo";

export const useGetExcelList = () => {
  const [GetExcelList] = useLazyQuery(gqlGetNShoppingExcelList);
  const toast = useToast();

  const getExcelList = async ({ groupFid }) => {
    const { data, error } = await GetExcelList({
      variables: { input: { groupFid } },
      fetchPolicy: "no-cache",
    });
    if (error) {
      toast({
        title: "그룹엑셀리스트 가져오기 실패",
        isClosable: true,
        duration: 3000,
        status: "error",
      });
      throw Error("ERR > getExcelList");
    }
    return { data: data.getNShoppingExcelList.data };
  };
  return { getExcelList };
};
