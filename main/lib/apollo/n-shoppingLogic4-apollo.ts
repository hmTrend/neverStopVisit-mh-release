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
  return {
    data: data.getNShoppingLogic4ExcelAlignFlatTargetOne.data,
    message: "OK > getNShoppingLogic4ExcelAlignFlatTargetOne ",
    error: "",
  };
};

const gqlPatchNShoppingLogic4NowCountIncrement = gql`
  mutation PatchNShoppingLogic4NowCountIncrement(
    $input: PatchNShoppingLogic4Input!
  ) {
    patchNShoppingLogic4NowCountIncrement(input: $input) {
      data {
        _id
        groupFid
        targetKeyword
        delayTime
        nvMidList
        nvMid
        nowCount
        dayCount
        workKeywordList {
          workKeyword
          targetBlog
        }
        createdAt
        updatedAt
      }
      message
      error
    }
  }
`;

export const PatchNShoppingLogic4NowCountIncrement = async ({
  groupFid,
  nvMid,
  targetKeyword,
}) => {
  const { data, errors } = await client.mutate({
    mutation: gqlPatchNShoppingLogic4NowCountIncrement,
    variables: {
      input: {
        groupFid,
        nvMid,
        targetKeyword,
      },
    },
    fetchPolicy: "no-cache",
  });
  if (errors) {
    console.error(errors[0].message);
    return {
      data,
      message: "ERR > PatchNShoppingLogic4NowCountIncrement ",
      error: errors[0].message,
    };
  }
  return {
    data: data.patchNShoppingLogic4NowCountIncrement.data,
    message: "OK > PatchNShoppingLogic4NowCountIncrement ",
    error: "",
  };
};
