import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { useSnapshot } from "valtio/react";
import { gqlDeleteNPlaceGroup } from "@/lib/graphql/n-place-apollo";
import { storeNPlace } from "@/valtio/nPlace.register.valtio";

export const useDeleteNPlaceGroup = () => {
  const [DeleteNPlaceGroup] = useMutation(gqlDeleteNPlaceGroup);
  const toast = useToast();
  const { groupList } = useSnapshot(storeNPlace);

  const deleteNPlaceGroup = async ({ groupFid }) => {
    const { errors } = await DeleteNPlaceGroup({
      variables: { input: { groupFid } },
    });
    if (errors) {
      toast({
        title: "그룹삭제 실패",
        isClosable: true,
        duration: 3000,
        status: "error",
      });
      throw Error("ERR > deleteNPlaceGroup");
    }
    storeNPlace.groupList = groupList.filter(
      (v: any) => v._id !== groupFid,
    ) as any;
    toast({
      title: "그룹삭제 성공",
      isClosable: true,
      duration: 3000,
      status: "success",
    });
  };
  return { deleteNPlaceGroup };
};
