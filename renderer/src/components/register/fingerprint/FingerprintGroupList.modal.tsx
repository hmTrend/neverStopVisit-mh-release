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
import { useDeleteFingerPrintGroup } from "@/hook/fingerPrint/useDeleteFingerPrintGroup";
import { storeFingerPrintRegister } from "@/valtio/fingerPrint.register.valtio";

export function FingerprintGroupListModal({ groupName, groupFid }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteFingerPrintGroup } = useDeleteFingerPrintGroup();

  const handleDeleteFingerPrintGroup = async () => {
    try {
      await deleteFingerPrintGroup({ groupFid });
      storeFingerPrintRegister.selectedExcelList = [];
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
            <Button variant="ghost" onClick={handleDeleteFingerPrintGroup}>
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
