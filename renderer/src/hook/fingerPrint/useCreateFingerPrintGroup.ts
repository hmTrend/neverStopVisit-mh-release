import { useMutation } from "@apollo/client";
import { gqlCreateFingerPrintGroup } from "@/lib/graphql/finger-print.apollo";
import { useToast } from "@chakra-ui/react";

export const useCreateFingerPrintGroup = () => {
  const [CreateFingerPrintGroup] = useMutation(gqlCreateFingerPrintGroup);
  const toast = useToast();

  const createFingerPrintGroup = async ({ groupName, memberFid }) => {
    const { data, errors } = await CreateFingerPrintGroup({
      variables: {
        input: { groupName, memberFid },
      },
    });
    if (errors) {
      console.log(errors[0].message);
      toast({
        title: "지문그룹 생성실패",
        isClosable: true,
        duration: 3000,
        status: "error",
      });
      return;
    }
    console.log("data");
    console.log(data.createFingerPrintGroup.data);
    return { data: data.createFingerPrintGroup.data };
  };
  return { createFingerPrintGroup };
};
