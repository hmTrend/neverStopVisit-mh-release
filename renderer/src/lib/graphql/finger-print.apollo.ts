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

export const gqlDeleteFingerPrintGroup = gql`
  mutation DeleteFingerPrintGroup($input: DeleteFingerPrintInput!) {
    deleteFingerPrintGroup(input: $input) {
      message
      error
    }
  }
`;

export const gqlCreateExcelList = gql`
  mutation CreateExcelList($input: [CreateFingerPrintExcelListInput!]!) {
    createExcelList(input: $input) {
      data {
        _id
        groupFid
        nId
        nPw
        bPw
        nState
        createdAt
        ip
        cookie
        phoneNumber
        updatedAt
      }
      message
      error
    }
  }
`;

export const gqlGetExcelList = gql`
  query GetExcelList($input: GetFingerPrintExcelListInput!) {
    getExcelList(input: $input) {
      data {
        _id
        groupFid
        nId
        nPw
        bPw
        nState
        createdAt
        ip
        cookie
        phoneNumber
        updatedAt
      }
      message
      error
    }
  }
`;

export const gqlPatchFingerPrintExcelList = gql`
  mutation PatchFingerPrintExcelList(
    $input: [CreateFingerPrintExcelListInput!]!
  ) {
    patchFingerPrintExcelList(input: $input) {
      data {
        _id
        groupFid
        nId
        nPw
        bPw
        nState
        createdAt
        ip
        cookie
        phoneNumber
        updatedAt
      }
      message
      error
    }
  }
`;
