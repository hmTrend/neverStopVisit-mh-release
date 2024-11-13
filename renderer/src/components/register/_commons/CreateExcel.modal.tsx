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

export function CreateExcelModal({ fn, selectedGroupName }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>엑셀 등록하기</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>엑셀등록하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            가져온 엑셀리스트를 {selectedGroupName} 등록하시겠습니까?
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
              엑셀등록
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
