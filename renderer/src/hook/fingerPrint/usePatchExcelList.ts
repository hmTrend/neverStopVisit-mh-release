import { useMutation } from "@apollo/client";
import { gqlPatchFingerPrintExcelList } from "@/lib/graphql/finger-print.apollo";
import { useToast } from "@chakra-ui/react";

export const usePatchExcelList = () => {
  const [PatchFingerPrintExcelList] = useMutation(gqlPatchFingerPrintExcelList);
  const toast = useToast();

  const patchExcelList = async ({ input }) => {
    const fixInput = input.map((v) => ({
      ...v,
      nId: v.nId?.toString(),
      phoneNumber: v.phoneNumber?.toString(),
    }));
    const { data, errors } = await PatchFingerPrintExcelList({
      variables: { input: fixInput },
      fetchPolicy: "no-cache",
    });
    if (errors) {
      toast({
        title: "엑셀지문 추가하기 실패",
        isClosable: true,
        duration: 3000,
        status: "error",
      });
      throw Error("ERR > patchExcelList");
    }
    toast({
      title: "엑셀지문 추가하기 성공",
      isClosable: true,
      duration: 3000,
      status: "success",
    });
    return { data: data.patchFingerPrintExcelList.data };
  };
  return { patchExcelList };
};
