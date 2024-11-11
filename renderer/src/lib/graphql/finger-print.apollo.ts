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
