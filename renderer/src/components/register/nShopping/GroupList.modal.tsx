import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  IconButton,
  Kbd,
} from "@chakra-ui/react";
import { CloseIcon, useDisclosure } from "@chakra-ui/icons";
import { storeNShopping } from "@/valtio/nShopping.register.valtio";

export function GroupListModal({ groupName, groupFid, fn }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    try {
      await fn({ groupFid });
      storeNShopping.selectedExcelList = [];
      onClose();
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <>
      <IconButton
        aria-label="Delete"
        icon={<CloseIcon />}
        onClick={() => onOpen()}
        bg="white"
        color="black"
        size={"sm"}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제여부</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Kbd fontSize={"xl"}>{groupName}</Kbd> 삭제하시겠습니까?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              취소하기
            </Button>
            <Button variant="ghost" onClick={handleDelete}>
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
