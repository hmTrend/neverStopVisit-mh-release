import { useLazyQuery } from "@apollo/client";
import { gqlGetNPlaceGroupList } from "@/lib/graphql/n-place-apollo";
import { useToast } from "@chakra-ui/react";

export const useGetNPlaceGroupList = () => {
  const [GetNPlaceGroupList] = useLazyQuery(gqlGetNPlaceGroupList, {
    variables: { input: { memberFid: "67315a7130d6d4d2bb26e38a" } },
    fetchPolicy: "no-cache",
  });
  const toast = useToast();

  const getNPlaceGroupList = async () => {
    const { data, error } = await GetNPlaceGroupList({
      variables: { input: { memberFid: "67315a7130d6d4d2bb26e38a" } },
      fetchPolicy: "no-cache",
    });

    console.log("place data gogo");
    console.log(data);

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
    return { data: data.GetNPlaceGroupList?.data };
  };

  return { getNPlaceGroupList };
};
