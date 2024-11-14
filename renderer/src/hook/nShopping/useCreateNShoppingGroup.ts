import { useMutation } from "@apollo/client";
import { gqlCreateNShoppingGroup } from "@/lib/graphql/n-shopping-apollo";
import { useToast } from "@chakra-ui/react";

export const useCreateNShoppingGroup = () => {
  const [CreateNShoppingGroup] = useMutation(gqlCreateNShoppingGroup);
  const toast = useToast();

  const createNShoppingGroup = async ({ groupName, memberFid }) => {
    const { data, errors } = await CreateNShoppingGroup({
      variables: { input: { groupName, memberFid } },
    });
    if (errors) {
      console.error("errors 333");
      console.error(errors);
      toast({
        title: "그룹생성 실패",
        isClosable: true,
        duration: 3000,
        status: "error",
      });
      throw new Error("ERR > createNShoppingGroup");
    }
    toast({
      title: "그룹생성 성공",
      isClosable: true,
      duration: 3000,
      status: "success",
    });
    return { data };
  };
  return { createNShoppingGroup };
};
