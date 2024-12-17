import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { gqlCreateNPlaceGroup } from "@/lib/graphql/n-place-apollo";

export const useCreateNPlaceGroup = () => {
  const [CreateNPlaceGroup] = useMutation(gqlCreateNPlaceGroup);
  const toast = useToast();

  const createNPlaceGroup = async ({ groupName, memberFid }) => {
    const { data, errors } = await CreateNPlaceGroup({
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
      throw new Error("ERR > createNPlaceGroup");
    }
    toast({
      title: "그룹생성 성공",
      isClosable: true,
      duration: 3000,
      status: "success",
    });
    return { data };
  };
  return { createNPlaceGroup };
};
