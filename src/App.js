import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyle, Theme } from "./globalandtheme";
import PageRoutes from "./PageRoutes";
import firebase from "firebase/app";
import "firebase/auth";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

firebase.initializeApp({
  apiKey: "AIzaSyBRelhF9kWyV9cI4kvFiQYBDu7HNBR-5_U",
  authDomain: "beach-volley-app.firebaseapp.com",
  projectId: "beach-volley-app",
  storageBucket: "beach-volley-app.appspot.com",
  messagingSenderId: "758236414363",
  appId: "1:758236414363:web:ec60a0c0299c837704213e",
});

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
      uri: "http://localhost:5000/graphql",
    })
  ),
});

const App = () => {
  useEffect(() => firebase.auth().onAuthStateChanged(client.resetStore));

  return (
    <ApolloProvider client={client}>
      <Router>
        <GlobalStyle />
        <Theme>
          <PageRoutes />
        </Theme>
      </Router>
    </ApolloProvider>
  );
};

export default App;
