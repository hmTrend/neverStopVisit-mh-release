import { useLazyQuery } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { gqlGetExcelList } from "../../lib/graphql/finger-print.apollo";
import { UtilDate } from "../../util/util.date";

export const useGetExcelList = () => {
  const [GetExcelList] = useLazyQuery(gqlGetExcelList);
  const toast = useToast();

  const getExcelList = async ({ groupFid, dataListCount }) => {
    const { data, error } = await GetExcelList({
      variables: { input: { groupFid, dataListCount } },
      fetchPolicy: "no-cache",
    });
    if (error) {
      toast({
        title: "그룹엑셀리스트 가져오기 실패",
        isClosable: true,
        duration: 3000,
        status: "error",
      });
      throw Error(`ERR > getExcelList > ${error.message}`);
    }

    // 데이터가 없는 경우를 처리
    if (!data.getExcelList?.data) {
      return {
        data: [],
        listTotalCount: 0,
      };
    }

    const latestDate = data.getExcelList.data.length
      ? Math.max(
          ...data.getExcelList.data.map((v) => new Date(v.updatedAt).getTime()),
        )
      : null;

    const dataTransDate = data.getExcelList.data.map((item) => ({
      ...item,
      updatedAt: UtilDate.formatKoreanTime(item.updatedAt),
      isLatest:
        latestDate !== null
          ? new Date(item.updatedAt).getTime() === latestDate
          : false,
    }));
    return {
      data: dataTransDate,
      listTotalCount: data.getExcelList?.listTotalCount || 0,
    };
  };
  return { getExcelList };
};
