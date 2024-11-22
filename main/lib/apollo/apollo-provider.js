import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client/core";
import path from "path";
import { app } from "electron";
import dotenv from "dotenv";

const basePath = app.getAppPath();
const envFilePath =
  process.env.NODE_ENV === "production"
    ? path.join(basePath, "main/.env.production")
    : path.join(basePath, "main/.env.development");
dotenv.config({ path: envFilePath });

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_URI,
});

export const client = new ApolloClient({
  link: ApolloLink.from([retryLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});
