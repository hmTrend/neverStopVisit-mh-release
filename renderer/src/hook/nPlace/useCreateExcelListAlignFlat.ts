import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { gqlCreateNPlaceExcelListAlignFlatMap } from "@/lib/graphql/n-place-apollo";

export const useCreateExcelListAlignFlat = () => {
  const [CreateNPlaceExcelListAlignFlatMap] = useMutation(
    gqlCreateNPlaceExcelListAlignFlatMap,
  );
  const toast = useToast();

  const createExcelListAlignFlat = async ({ input }) => {
    const { data, errors } = await CreateNPlaceExcelListAlignFlatMap({
      variables: { input },
    });
    if (errors) {
      toast({
        title: "플레이스엑셀각각 만들기 실패",
        isClosable: true,
        duration: 3000,
        status: "error",
      });
      throw Error("ERR > createExcelListAlignFlat");
    }
    toast({
      title: "플레이스엑셀각각 만들기 성공",
      isClosable: true,
      duration: 3000,
      status: "success",
    });
    return { data };
  };
  return { createExcelListAlignFlat };
};
