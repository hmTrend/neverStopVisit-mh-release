import { gql } from "@apollo/client";
import { client } from "./apollo-provider";

const gqlGetNShoppingExcelAlignFlatTargetOne = gql`
  query GetNShoppingExcelAlignFlatTargetOne(
    $input: GetNShoppingExcelListInput!
  ) {
    getNShoppingExcelAlignFlatTargetOne(input: $input) {
      data {
        _id
        groupFid
        title
        catalog
        nvMid
        views
        query
        createdAt
        updatedAt
      }
      message
      error
    }
  }
`;

export const GetNShoppingExcelAlignFlatTargetOne = async ({ groupFid }) => {
  const { data, error } = await client.query({
    query: gqlGetNShoppingExcelAlignFlatTargetOne,
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
      message: "ERR > GetNShoppingExcelAlignFlatTargetOne ",
      error: error.message,
    };
  }
  return {
    data: data.getNShoppingExcelAlignFlatTargetOne.data,
    message: "OK > GetNShoppingExcelAlignFlatTargetOne ",
    error: "",
  };
};
