import { gql } from "@apollo/client";

export const gqlCreateNShoppingGroup = gql`
  mutation CreateNShoppingGroup($input: CreateNShoppingInput!) {
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
