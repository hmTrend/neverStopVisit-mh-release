import { gql } from "@apollo/client";

export const gqlCreateFingerPrintGroup = gql`
  mutation CreateFingerPrintGroup2($input: CreateFingerPrint2Input!) {
    createFingerPrintGroup2(input: $input) {
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
  query GetFingerPrintGroupList2($input: GetFingerPrint2Input!) {
    getFingerPrintGroupList2(input: $input) {
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
  mutation DeleteFingerPrintGroup2($input: DeleteFingerPrint2Input!) {
    deleteFingerPrintGroup2(input: $input) {
      message
      error
    }
  }
`;

export const gqlCreateExcelList = gql`
  mutation CreateExcelList2($input: [CreateFingerPrint2ExcelListInput!]!) {
    createExcelList2(input: $input) {
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
        type
      }
      message
      error
    }
  }
`;

export const gqlGetExcelList = gql`
  query GetExcelList2($input: GetFingerPrint2ExcelListInput!) {
    getExcelList2(input: $input) {
      data {
        _id
        groupFid
        nId
        nPw
        bPw
        nState
        createdAt
        ip
        phoneNumber
        updatedAt
        type
      }
      listTotalCount
      message
      error
    }
  }
`;

export const gqlGetExcelListDownload = gql`
  query GetExcelList2($input: GetFingerPrint2ExcelListInput!) {
    getExcelList2(input: $input) {
      data {
        _id
        groupFid
        nId
        nPw
        bPw
        nState
        createdAt
        ip
        phoneNumber
        updatedAt
        type
        cookie
      }
      listTotalCount
      message
      error
    }
  }
`;

export const gqlPatchFingerPrintExcelList = gql`
  mutation PatchFingerPrintExcelList2(
    $input: [CreateFingerPrintExcelListInput!]!
  ) {
    patchFingerPrintExcelList2(input: $input) {
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

export const gqlFetchFingerPrintTargetExcelOne = gql`
  mutation FetchFingerPrint2TargetExcelOne2($input: FetchFingerPrint2Input!) {
    fetchFingerPrintTargetExcelOne2(input: $input) {
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
        type
      }
      message
      error
    }
  }
`;
