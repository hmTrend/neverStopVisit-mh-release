import { gqlFetchFingerPrintTargetExcelOne } from "@/lib/graphql/finger-print.apollo";
import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { PlaywrighterUtil } from "@/util/playwrighter.util";

export const useFetchTargetExcelOneCookie = () => {
  const [FetchFingerPrintTargetExcelOne] = useMutation(
    gqlFetchFingerPrintTargetExcelOne,
  );
  const toast = useToast();

  const fetchFingerPrintTargetExcelOne = async ({ _id, cookie, nState }) => {
    const { cookieData,isCACT } = PlaywrighterUtil.extractCTATCookie(cookie);
    let cookieTemplate = cookieData
    if(isCACT){
      cookieTemplate = [
        {
          name: "CT_AT",
          value: cookieData,
          domain: ".coupang.com",
          path: "/",
          expires: -1,
          httpOnly: true,
          secure: true,
          sameSite: "lax",
        },
      ];
    }
    
    const { data, errors } = await FetchFingerPrintTargetExcelOne({
      variables: {
        input: { _id, cookie: JSON.stringify(cookieTemplate), nState },
      },
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
