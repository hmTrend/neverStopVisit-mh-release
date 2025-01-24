import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { gqlCreateNShoppingLogic4ExcelListAlignFlatMap } from "@/lib/graphql/n-shoppingLogic4-apollo";

export const useCreateExcelListAlignFlat = () => {
  const [CreateNShoppingExcelListAlignFlatMap] = useMutation(
    gqlCreateNShoppingLogic4ExcelListAlignFlatMap,
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
      throw Error(`ERR > createExcelListAlignFlat > ${errors[0].message}`);
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
