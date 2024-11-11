import { gql } from "@apollo/client";

export const gqlCreateFingerPrintGroup = gql`
  mutation CreateFingerPrintGroup($input: CreateFingerPrintInput!) {
    createFingerPrintGroup(input: $input) {
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

export const gqlGetFingerPrintGroupList = gql`
  query GetFingerPrintGroupList($input: GetFingerPrintInput!) {
    getFingerPrintGroupList(input: $input) {
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
