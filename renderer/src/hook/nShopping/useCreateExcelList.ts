import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { gqlCreateExcelList } from "@/lib/graphql/n-shopping-apollo";

export const useCreateExcelList = () => {
  const [CreateExcelList] = useMutation(gqlCreateExcelList);
  const toast = useToast();

  const createExcelList = async ({ input }) => {
    const { data, errors } = await CreateExcelList({ variables: { input } });
    if (errors) {
      toast({
        title: "엑셀지문 만들기 실패",
        isClosable: true,
        duration: 3000,
        status: "error",
      });
      throw Error("ERR > createExcelList");
    }
    toast({
      title: "엑셀지문 만들기 성공",
      isClosable: true,
      duration: 3000,
      status: "success",
    });
    return { data };
  };
  return { createExcelList };
};
