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

export const gqlDeleteNShoppingGroup = gql`
  mutation DeleteNShoppingGroup($input: DeleteFingerPrintInput!) {
    deleteNShoppingGroup(input: $input) {
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

export const gqlCreateNShoppingExcelList = gql`
  mutation CreateNShoppingExcelList($input: [CreateNShoppingExcelListInput!]!) {
    createNShoppingExcelList(input: $input) {
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

export const gqlGetNShoppingExcelList = gql`
  query GetNShoppingExcelList($input: GetNShoppingExcelListInput!) {
    getNShoppingExcelList(input: $input) {
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

export const gqlCreateNShoppingExcelListAlignFlatMap = gql`
  mutation CreateNShoppingExcelListAlignFlatMap(
    $input: [CreateNShoppingExcelListAlignFlatMapInput!]!
  ) {
    createNShoppingExcelListAlignFlatMap(input: $input) {
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
