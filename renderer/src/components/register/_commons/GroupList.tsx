import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { GroupListModal } from "@/components/register/_commons/GroupList.modal";

export const GroupList = ({ groupList = [], fn, modalFn }) => (
  <Flex>
    <Box>
      <FormControl>
        <FormLabel>생성된 그룹리스트</FormLabel>
        <Flex wrap={"wrap"} gap={3}>
          {groupList?.map((v: any, i: number) => (
            <Box
              key={i}
              border="1px solid black"
              display={"flex"}
              alignItems={"center"}
            >
              <Button
                onClick={() =>
                  fn({
                    groupId: v._id,
                    groupName: v.groupName,
                  })
                }
              >
                {v.groupName}
              </Button>
              <IconButton
                aria-label="Edit"
                icon={<EditIcon />}
                bg="white"
                color="black"
                onClick={() => alert("Edit button clicked!")}
              />
              <GroupListModal
                groupName={v.groupName}
                groupFid={v._id}
                fn={modalFn}
              />
            </Box>
          ))}
        </Flex>
        <FormHelperText>생성된 그룹 리스트를 선택합니다.</FormHelperText>
      </FormControl>
    </Box>
  </Flex>
);
