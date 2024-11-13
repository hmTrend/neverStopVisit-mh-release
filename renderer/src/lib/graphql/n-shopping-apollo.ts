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
