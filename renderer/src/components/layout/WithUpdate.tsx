import { Flex } from "@chakra-ui/react";
import { Fragment } from "react";
import { useSnapshot } from "valtio/react";
import { storeAuth } from "@/valtio/member.valtio";
import { LoginApp } from "@/components/layout/LoginApp";

export const WithUpdate = ({ children }) => {
  const { userId } = useSnapshot(storeAuth);

  if (userId) {
    return <Fragment>{children}</Fragment>;
  }
  return (
    <Flex>
      <LoginApp />
    </Flex>
  );
};
