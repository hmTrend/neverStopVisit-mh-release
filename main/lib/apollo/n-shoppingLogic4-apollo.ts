import { gql } from "@apollo/client";
import { client } from "./apollo-provider";

const gqlGetNShoppingLogic4ExcelAlignFlatTargetOne = gql`
  query GetNShoppingLogic4ExcelAlignFlatTargetOne(
    $input: GetNShoppingExcelListInput!
  ) {
    getNShoppingLogic4ExcelAlignFlatTargetOne(input: $input) {
      data {
        _id
        groupFid
        targetKeyword
        delayTime
        nvMidList
        nvMid
        nowCount
        dayCount
        workKeyword
        targetBlog
        createdAt
        updatedAt
      }
      message
      error
    }
  }
`;

export const GetNShoppingLogic4ExcelAlignFlatTargetOne = async ({
  groupFid,
}) => {
  const { data, error } = await client.query({
    query: gqlGetNShoppingLogic4ExcelAlignFlatTargetOne,
    variables: {
      input: {
        groupFid,
      },
    },
    fetchPolicy: "no-cache",
  });
  if (error) {
    console.error(error.message);
    return {
      data,
      message: "ERR > GetNShoppingLogic4ExcelAlignFlatTargetOne ",
      error: error.message,
    };
  }
  console.log("data 555777");
  console.log(data);
  return {
    data: data.getNShoppingLogic4ExcelAlignFlatTargetOne.data,
    message: "OK > getNShoppingLogic4ExcelAlignFlatTargetOne ",
    error: "",
  };
};
