import React, { useEffect } from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import firebase from "firebase/app";
import { UPSERT_USER } from "../queries";

const authLink = setContext(async (_, { headers }) => {
  const token = await firebase.auth().currentUser?.getIdToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(
    new HttpLink({
      uri: process.env.REACT_APP_API_ENDPOINT,
    })
  ),
});

const ApolloWrapper = ({ children }) => {
  useEffect(() =>
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await client.mutate({ mutation: UPSERT_USER });
      }

      await client.resetStore();
    })
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
