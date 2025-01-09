import { gql } from "@apollo/client";

export const gqlCreateNShoppingLogic4Group = gql`
  mutation CreateNShoppingLogic4Group(
    $input: CreateNShoppingLogic4GroupInput!
  ) {
    createNShoppingLogic4Group(input: $input) {
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

export const gqlGetNShoppingLogicGroupList = gql`
  query GetNShoppingLogicGroupList($input: GetFingerPrintInput!) {
    getNShoppingLogicGroupList(input: $input) {
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

export const gqlDeleteNShoppingLogic4Group = gql`
  mutation DeleteNShoppingLogic4Group($input: DeleteFingerPrintInput!) {
    deleteNShoppingLogic4Group(input: $input) {
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

export const gqlCreateNShoppingLogic4ExcelList = gql`
  mutation CreateNShoppingLogic4ExcelList(
    $input: [CreateNShoppingLogic4ExcelListInput!]!
  ) {
    createNShoppingLogic4ExcelList(input: $input) {
      data {
        _id
        groupFid
        targetKeyword
        delayTime
        nvMid
        nowCount
        dayCount
        nvMidList
        createdAt
        updatedAt
        workKeywordList {
          targetBlog
          workKeyword
        }
      }
      message
      error
    }
  }
`;

export const gqlGetNShoppingLogic4ExcelList = gql`
  query GetNShoppingLogic4ExcelList($input: GetNShoppingExcelListInput!) {
    getNShoppingLogic4ExcelList(input: $input) {
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

export const gqlCreateNShoppingLogic4ExcelListAlignFlatMap = gql`
  mutation CreateNShoppingLogic4ExcelListAlignFlatMap(
    $input: [CreateNShoppingLogic4ExcelListAlignFlatMapInput!]!
  ) {
    createNShoppingLogic4ExcelListAlignFlatMap(input: $input) {
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
