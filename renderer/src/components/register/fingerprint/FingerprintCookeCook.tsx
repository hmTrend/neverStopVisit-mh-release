import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  Kbd,
  Textarea,
  Flex,
  Code,
  useToast,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/icons";
import { useFetchTargetExcelOneCookie } from "@/hook/fingerPrint/useFetchTargetExcelOneCookie";
import { useRef } from "react";

export function FingerprintCookeCook({ nId, indexNum, type, _id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchFingerPrintTargetExcelOne } = useFetchTargetExcelOneCookie();
  const cookieRef = useRef(null);
  const toast = useToast();

  return (
    <>
      <Button
        fontSize={"xs"}
        variant={"link"}
        fontWeight={"light"}
        onClick={onOpen}
      >
        쿠키굽기
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{indexNum + 1}번 쿠키값 수정하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={"column"} gap={6}>
              <Box display={"flex"} gap={3}>
                <Text>타입</Text>
                <Code fontSize={"md"}>
                  {type === "coupang" ? "쿠팡" : "네이버"}
                </Code>
              </Box>
              <Box display={"flex"} gap={3}>
                <Text>아이디</Text>
                <Kbd fontSize={"xl"}>{nId}</Kbd>
              </Box>
              <Box display={"flex"} gap={3}>
                <Text width="100px">쿠키입력</Text>
                <Textarea ref={cookieRef} height={"300px"} fontSize={"xs"} />
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              닫기
            </Button>
            <Button
              variant="ghost"
              onClick={async () => {
                if (cookieRef.current.value === "") {
                  toast({
                    title: "쿠키값 미입력",
                    duration: 3000,
                    status: "error",
                  });
                  return;
                }
                await fetchFingerPrintTargetExcelOne({
                  _id,
                  cookie: cookieRef.current.value,
                  nState: "정상",
                });
                onClose();
              }}
            >
              수정하기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
