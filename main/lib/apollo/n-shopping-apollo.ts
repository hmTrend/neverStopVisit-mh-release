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
  console.log("groupFid 222333");
  console.log(groupFid);
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
      message: "ERR > CreateNShoppingExcelListAlignFlatMap ",
      error: error.message,
    };
  }
  return {
    data: data.getNShoppingExcelAlignFlatTargetOne.data,
    message: "OK > CreateNShoppingExcelListAlignFlatMap ",
    error: "",
  };
};
