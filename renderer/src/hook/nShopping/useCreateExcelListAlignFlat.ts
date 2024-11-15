import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import {
  gqlCreateNShoppingExcelList,
  gqlCreateNShoppingExcelListAlignFlatMap,
} from "@/lib/graphql/n-shopping-apollo";

export const useCreateExcelListAlignFlat = () => {
  const [CreateNShoppingExcelListAlignFlatMap] = useMutation(
    gqlCreateNShoppingExcelListAlignFlatMap,
  );
  const toast = useToast();

  const createExcelListAlignFlat = async ({ input }) => {
    const { data, errors } = await CreateNShoppingExcelListAlignFlatMap({
      variables: { input },
    });
    if (errors) {
      toast({
        title: "쇼핑엑셀각각 만들기 실패",
        isClosable: true,
        duration: 3000,
        status: "error",
      });
      throw Error("ERR > createExcelListAlignFlat");
    }
    toast({
      title: "쇼핑엑셀각각 만들기 성공",
      isClosable: true,
      duration: 3000,
      status: "success",
    });
    return { data };
  };
  return { createExcelListAlignFlat };
};
