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
  const { data, errors } = await client.query({
    query: gqlGetNPlaceExcelAlignFlatTargetOne,
    variables: {
      input: {
        groupFid,
      },
    },
    fetchPolicy: "no-cache",
  });
  if (errors) {
    console.error(
      `this is GetNPlaceExcelAlignFlatTargetOne > ${errors[0].message}`,
    );
    throw new Error(`GetNPlaceExcelAlignFlatTargetOne > ${errors[0].message}`);
  }
  return {
    data: data.getNPlaceExcelAlignFlatTargetOne.data,
    message: "OK > GetNPlaceExcelAlignFlatTargetOne ",
    error: "",
  };
};

const gqlGetNPlaceExcelAlignFlatTargetOneWithoutPlaceNumber = gql`
  query GetNPlaceExcelAlignFlatTargetOneWithoutPlaceNumber(
    $input: GetNPlaceExcelListWithoutPlaceNumberInput!
  ) {
    getNPlaceExcelAlignFlatTargetOneWithoutPlaceNumber(input: $input) {
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

export const GetNPlaceExcelAlignFlatTargetOneWithoutPlaceNumber = async ({
  groupFid,
  placeNumber,
}) => {
  const { data, errors } = await client.query({
    query: gqlGetNPlaceExcelAlignFlatTargetOneWithoutPlaceNumber,
    variables: {
      input: {
        groupFid,
        placeNumber,
      },
    },
    fetchPolicy: "no-cache",
  });
  console.log("GetNPlaceExcelAlignFlatTargetOneWithoutPlaceNumber 33333 ");
  console.log(data);
  if (errors) {
    console.error(
      `this is GetNPlaceExcelAlignFlatTargetOneWithoutPlaceNumber > ${errors[0].message}`,
    );
    throw new Error(
      `GetNPlaceExcelAlignFlatTargetOneWithoutPlaceNumber > ${errors[0].message}`,
    );
  }
  return {
    data: data.getNPlaceExcelAlignFlatTargetOneWithoutPlaceNumber.data,
    message: "OK > GetNPlaceExcelAlignFlatTargetOneWithoutPlaceNumber ",
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

export const PatchNPlaceDayNowCount = async ({
  groupFid = "67aafd4a7c9b8a9996fa459d",
  placeNumber = 1064966442,
} = {}) => {
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

// PatchNPlaceDayNowCount();
