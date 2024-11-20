import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/icons";

export function FingerprintPatchExcelModal({ fn, selectedGroupName }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>엑셀 추가등록</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>엑셀 추가 등록하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            기존 리스트를 유지하고, 엑셀리스트를 {selectedGroupName} 추가등록
            하시겠습니까?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              취소하기
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                fn();
                onClose();
              }}
            >
              엑셀 추가 등록
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
