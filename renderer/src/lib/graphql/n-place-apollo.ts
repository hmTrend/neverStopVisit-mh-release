import { gql } from "@apollo/client";

export const gqlCreateNPlaceGroup = gql`
  mutation CreateNPlaceGroup($input: CreateNPlaceGroupInput!) {
    createNPlaceGroup(input: $input) {
      data {
        _id
        memberFid
        groupName
        createdAt
        updatedAt
      }
      message
      error
    }
  }
`;

export const gqlGetNPlaceGroupList = gql`
  query GetNPlaceGroupList($input: GetFingerPrintInput!) {
    GetNPlaceGroupList(input: $input) {
      data {
        _id
        memberFid
        groupName
        createdAt
        updatedAt
      }
      message
      error
    }
  }
`;

export const gqlDeleteNPlaceGroup = gql`
  mutation DeleteNPlaceGroup($input: DeleteFingerPrintInput!) {
    deleteNPlaceGroup(input: $input) {
      data {
        _id
        memberFid
        groupName
        createdAt
        updatedAt
      }
      message
      error
    }
  }
`;

export const gqlCreateNPlaceExcelList = gql`
  mutation CreateNPlaceExcelList($input: [CreateNPlaceExcelListInput!]!) {
    createNPlaceExcelList(input: $input) {
      data {
        _id
        groupFid
        keyword
        delayTime
        placeName
        placeNumber
        dayCount
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

export const gqlGetNPlaceExcelList = gql`
  query GetNPlaceExcelList($input: GetNPlaceExcelListInput!) {
    getNPlaceExcelList(input: $input) {
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

export const gqlCreateNPlaceExcelListAlignFlatMap = gql`
  mutation CreateNPlaceExcelListAlignFlatMap(
    $input: [CreateNPlaceExcelListAlignFlatMapInput!]!
  ) {
    createNPlaceExcelListAlignFlatMap(input: $input) {
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
      error
      message
    }
  }
`;
