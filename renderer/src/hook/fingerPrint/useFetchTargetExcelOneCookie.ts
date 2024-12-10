import { gqlFetchFingerPrintTargetExcelOne } from "@/lib/graphql/finger-print.apollo";
import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";

export const useFetchTargetExcelOneCookie = () => {
  const [FetchFingerPrintTargetExcelOne] = useMutation(
    gqlFetchFingerPrintTargetExcelOne,
  );
  const toast = useToast();

  const fetchFingerPrintTargetExcelOne = async ({ _id, cookie, nState }) => {
    const { data, errors } = await FetchFingerPrintTargetExcelOne({
      variables: { input: { _id, cookie, nState } },
    });
    if (errors) {
      console.log(errors[0].message);
      toast({
        title: "지문그룹 쿠키굽기실패",
        isClosable: true,
        duration: 3000,
        status: "error",
      });
      return;
    }
    toast({
      title: "지문그룹 쿠키굽기성공",
      isClosable: true,
      duration: 3000,
      status: "success",
    });
    return { data: data.fetchFingerPrintTargetExcelOne.data };
  };
  return { fetchFingerPrintTargetExcelOne };
};
