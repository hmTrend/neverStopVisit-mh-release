import { useLazyQuery } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { gqlGetNPlaceExcelList } from "@/lib/graphql/n-place-apollo";

export const useGetExcelList = () => {
  const [GetExcelList] = useLazyQuery(gqlGetNPlaceExcelList);
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
      throw Error(`ERR > getExcelList > ${error.message}`);
    }
    return { data: data.getNPlaceExcelList.data };
  };
  return { getExcelList };
};
