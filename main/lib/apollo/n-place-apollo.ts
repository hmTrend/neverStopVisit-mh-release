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

const gqlPatchNPlaceDayNowCount = gql`
  mutation PatchNPlaceDayNowCount($input: PatchNPlaceDayNowCountInput!) {
    patchNPlaceDayNowCount(input: $input) {
      data {
        _id
        groupFid
        keyword
        delayTime
        placeName
        placeNumber
        dayCount
        dayNowCount
        subKeywordList {
          dayCount
          targetBlog
          targetKeyword
        }
        createdAt
        updatedAt
      }
      message
      error
    }
  }
`;

export const PatchNPlaceDayNowCount = async ({ groupFid, placeNumber }) => {
  const { data, errors } = await client.mutate({
    mutation: gqlPatchNPlaceDayNowCount,
    variables: {
      input: {
        groupFid,
        placeNumber,
      },
    },
    fetchPolicy: "no-cache",
  });
  console.log("data 77777777");
  console.log(data);
  if (errors) {
    console.error(errors[0].message);
    return {
      data,
      message: "err > PatchNPlaceDayNowCount ",
      error: errors[0].message,
    };
  }
  return {
    data: data.patchNPlaceDayNowCount.data,
    message: "ok > PatchNPlaceDayNowCount ",
    error: "",
  };
};
