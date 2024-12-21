import { gql } from "@apollo/client";
import { client } from "./apollo-provider";

const gqlGetFingerPrintTargetExcelOne = gql`
  query GetFingerPrintTargetExcelOne($input: GetFingerPrintExcelListInput!) {
    getFingerPrintTargetExcelOne(input: $input) {
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

export const GetFingerPrintTargetExcelOne = async ({ groupFid }) => {
  const { data, error } = await client.query({
    query: gqlGetFingerPrintTargetExcelOne,
    variables: {
      input: {
        groupFid,
      },
    },
    fetchPolicy: "no-cache",
  });
  if (error) {
    console.error(error.message);
    return {
      data,
      message: "ERR > GetFingerPrintTargetExcelOne ",
      error: error.message,
    };
  }
  return {
    data: data.getFingerPrintTargetExcelOne.data,
    message: "OK > GetFingerPrintTargetExcelOne ",
    error: "",
  };
};

const gqlFetchFingerPrintTargetExcelOne = gql`
  mutation FetchFingerPrintTargetExcelOne($input: FetchFingerPrintInput!) {
    fetchFingerPrintTargetExcelOne(input: $input) {
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

export const FetchFingerPrintTargetExcelOne = async ({
  _id,
  cookie,
  nState,
}) => {
  const { data, errors } = await client.mutate({
    mutation: gqlFetchFingerPrintTargetExcelOne,
    variables: {
      input: {
        _id,
        cookie,
        nState,
      },
    },
    fetchPolicy: "no-cache",
  });
  if (errors) {
    console.error(errors[0].message);
    return {
      data: "",
      message: "ERR > FetchFingerPrintTargetExcelOne ",
      error: errors[0].message,
    };
  }
  return {
    data: data.fetchFingerPrintTargetExcelOne.data,
    message: "OK > FetchFingerPrintTargetExcelOne ",
    error: "",
  };
};

const gqlGetFingerPrintTargetExcelOneFromId = gql`
  query GetFingerPrintTargetExcelOneFromId(
    $input: GetFingerPrintExcelListFromIdInput!
  ) {
    getFingerPrintTargetExcelOneFromId(input: $input) {
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

export const GetFingerPrintTargetExcelOneFromId = async ({ _id }) => {
  const { data, error } = await client.query({
    query: gqlGetFingerPrintTargetExcelOneFromId,
    variables: {
      input: {
        _id,
      },
    },
    fetchPolicy: "no-cache",
  });
  if (error) {
    console.error(error.message);
    return {
      data: "",
      message: "ERR > GetFingerPrintTargetExcelOneFromId ",
      error: error.message,
    };
  }
  return {
    data: data.getFingerPrintTargetExcelOneFromId.data,
    message: "OK > GetFingerPrintTargetExcelOneFromId ",
    error: "",
  };
};
