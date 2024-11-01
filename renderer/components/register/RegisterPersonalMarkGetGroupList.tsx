import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

export const RegisterPersonalMarkGetGroupList = () => {
  return (
    <Flex>
      <Box>
        <FormControl>
          <FormLabel>생성된 그룹리스트</FormLabel>
          <Box display={"flex"} gap={3}>
            <Box>
              <Button variant={"outline"}>그룹1</Button>
              <IconButton
                aria-label="Edit"
                icon={<EditIcon />}
                bg="white"
                color="black"
                onClick={() => alert("Edit button clicked!")}
              />
              <IconButton
                aria-label="Delete"
                icon={<DeleteIcon />}
                onClick={() => alert("Delete button clicked!")}
                bg="white"
                color="black"
              />
            </Box>
            <Box>
              <Button variant={"outline"}>그룹2</Button>
              <IconButton
                aria-label="Edit"
                icon={<EditIcon />}
                bg="white"
                color="black"
                onClick={() => alert("Edit button clicked!")}
              />
              <IconButton
                aria-label="Delete"
                icon={<DeleteIcon />}
                onClick={() => alert("Delete button clicked!")}
                bg="white"
                color="black"
              />
            </Box>
            <Box>
              <Button variant={"outline"}>그룹3</Button>
              <IconButton
                aria-label="Edit"
                icon={<EditIcon />}
                bg="white"
                color="black"
                onClick={() => alert("Edit button clicked!")}
              />
              <IconButton
                aria-label="Delete"
                icon={<DeleteIcon />}
                onClick={() => alert("Delete button clicked!")}
                bg="white"
                color="black"
              />
            </Box>
          </Box>
          <FormHelperText>생성된 그룹 리스트를 선택합니다.</FormHelperText>
        </FormControl>
      </Box>
    </Flex>
  );
};
