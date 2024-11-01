import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

export const FingerprintGroupList = () => {
  return (
    <Flex>
      <Box>
        <FormControl>
          <FormLabel>생성된 그룹리스트</FormLabel>
          <Box display={"flex"} gap={3}>
            <Box border="1px solid black">
              <Button>그룹1</Button>
              <IconButton
                aria-label="Edit"
                icon={<EditIcon />}
                bg="white"
                color="black"
                onClick={() => alert("Edit button clicked!")}
              />
              <IconButton
                aria-label="Delete"
                icon={<CloseIcon />}
                onClick={() => alert("Delete button clicked!")}
                bg="white"
                color="black"
                size={"sm"}
              />
            </Box>
            <Box border="1px solid black">
              <Button>그룹2</Button>
              <IconButton
                aria-label="Edit"
                icon={<EditIcon />}
                bg="white"
                color="black"
                onClick={() => alert("Edit button clicked!")}
              />
              <IconButton
                aria-label="Delete"
                icon={<CloseIcon />}
                onClick={() => alert("Delete button clicked!")}
                bg="white"
                color="black"
                size={"sm"}
              />
            </Box>
            <Box border="1px solid black">
              <Button>그룹3</Button>
              <IconButton
                aria-label="Edit"
                icon={<EditIcon />}
                bg="white"
                color="black"
                onClick={() => alert("Edit button clicked!")}
              />
              <IconButton
                aria-label="Delete"
                icon={<CloseIcon />}
                onClick={() => alert("Delete button clicked!")}
                bg="white"
                color="black"
                size={"sm"}
              />
            </Box>
          </Box>
          <FormHelperText>생성된 그룹 리스트를 선택합니다.</FormHelperText>
        </FormControl>
      </Box>
    </Flex>
  );
};
