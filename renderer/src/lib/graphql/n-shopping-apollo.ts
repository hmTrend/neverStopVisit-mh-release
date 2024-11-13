import { gql } from "@apollo/client";

export const gqlCreateNShoppingGroup = gql`
  mutation CreateNShoppingGroup($input: CreateNShoppingGroupInput!) {
    createNShoppingGroup(input: $input) {
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

export const gqlGetNShoppingGroupList = gql`
  query GetNShoppingGroupList($input: GetFingerPrintInput!) {
    getNShoppingGroupList(input: $input) {
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

export const gqlCreateExcelList = gql`
  mutation CreateExcelList($input: [CreateNShoppingExcelListInput!]!) {
    createExcelList(input: $input) {
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
