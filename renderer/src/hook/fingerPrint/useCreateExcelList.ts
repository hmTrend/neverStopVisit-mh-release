import { useMutation } from "@apollo/client";
import { gqlCreateExcelList } from "@/lib/graphql/finger-print.apollo";
import { useToast } from "@chakra-ui/react";

export const useCreateExcelList = () => {
  const [CreateExcelList] = useMutation(gqlCreateExcelList);
  const toast = useToast();

  const createExcelList = async ({ input }) => {
    const fixInput = input.map((v) => ({
      ...v,
      nId: v.nId?.toString(),
      phoneNumber: v.phoneNumber?.toString(),
    }));
    const { data, errors } = await CreateExcelList({
      variables: { input: fixInput },
    });
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
    return { data: data.createExcelList.data };
  };
  return { createExcelList };
};
