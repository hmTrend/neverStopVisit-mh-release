import { useLazyQuery } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { gqlGetNShoppingLogic4ExcelList } from "@/lib/graphql/n-shoppingLogic4-apollo";

export const useGetExcelList = () => {
  const [GetExcelList] = useLazyQuery(gqlGetNShoppingLogic4ExcelList);
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
    return { data: data.getNShoppingLogic4ExcelList.data };
  };
  return { getExcelList };
};
