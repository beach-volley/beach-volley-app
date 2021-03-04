import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyle, Theme } from "./globalandtheme";
import PageRoutes from "./PageRoutes";
import firebase from "firebase/app";
import "firebase/auth";
import ApolloWrapper from "./containers/ApolloWrapper";

firebase.initializeApp({
  apiKey: "AIzaSyBRelhF9kWyV9cI4kvFiQYBDu7HNBR-5_U",
  authDomain: "beach-volley-app.firebaseapp.com",
  projectId: "beach-volley-app",
  storageBucket: "beach-volley-app.appspot.com",
  messagingSenderId: "758236414363",
  appId: "1:758236414363:web:ec60a0c0299c837704213e",
});

const App = () => {
  return (
    <ApolloWrapper>
      <Router>
        <GlobalStyle />
        <Theme>
          <PageRoutes />
        </Theme>
      </Router>
    </ApolloWrapper>
  );
};

export default App;
