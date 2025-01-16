import { gql } from "@apollo/client";
import { client } from "./apollo-provider";

const gqlGetNPlaceExcelAlignFlatTargetOne = gql`
  query GetNPlaceExcelAlignFlatTargetOne($input: GetNPlaceExcelListInput!) {
    getNPlaceExcelAlignFlatTargetOne(input: $input) {
      data {
        _id
        groupFid
        keyword
        delayTime
        placeName
        placeNumber
        dayCount
        totalDayCount
        targetBlog
        targetKeyword
        createdAt
        updatedAt
      }
      message
      error
    }
  }
`;

export const GetNPlaceExcelAlignFlatTargetOne = async ({ groupFid }) => {
  const { data, error } = await client.query({
    query: gqlGetNPlaceExcelAlignFlatTargetOne,
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
      message: "ERR > GetNPlaceExcelAlignFlatTargetOne ",
      error: error.message,
    };
  }
  return {
    data: data.getNPlaceExcelAlignFlatTargetOne.data,
    message: "OK > GetNPlaceExcelAlignFlatTargetOne ",
    error: "",
  };
};
