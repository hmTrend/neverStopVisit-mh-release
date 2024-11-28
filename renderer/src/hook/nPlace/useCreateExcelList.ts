import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { gqlCreateNPlaceExcelList } from "@/lib/graphql/n-place-apollo";

export const useCreateExcelList = () => {
  const [CreateExcelList] = useMutation(gqlCreateNPlaceExcelList);
  const toast = useToast();

  const createExcelList = async ({ input }) => {
    console.log("input 1111222");
    console.log(input);
    const { data, errors } = await CreateExcelList({ variables: { input } });
    if (errors) {
      toast({
        title: "플레이스엑셀 만들기 실패",
        isClosable: true,
        duration: 3000,
        status: "error",
      });
      throw Error("ERR > createExcelList");
    }
    toast({
      title: "플레이스엑셀 만들기 성공",
      isClosable: true,
      duration: 3000,
      status: "success",
    });
    return { data };
  };
  return { createExcelList };
};
