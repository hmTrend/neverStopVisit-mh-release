import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { forwardRef } from "react";

interface CreateGroupProps {
  fn: () => void; // 클릭 이벤트 함수
  loading: boolean; // 로딩 상태
  title: string; // 그룹 제목 - 이 부분이 누락되어 있었습니다
}

export const CreateGroup = forwardRef<HTMLInputElement, CreateGroupProps>(
  ({ fn, loading, title }, ref) => {
    return (
      <Flex>
        <Box>
          <FormControl>
            <FormLabel>{title} 그룹 만들기</FormLabel>
            <Box display={"flex"}>
              <Input type="email" ref={ref} />
              <Button onClick={fn} isLoading={loading}>
                {title} 그룹생성
              </Button>
            </Box>
            <FormHelperText>새로운 {title} 그룹을 생성합니다.</FormHelperText>
          </FormControl>
        </Box>
      </Flex>
    );
  },
);
