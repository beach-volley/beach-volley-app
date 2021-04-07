import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyle, Theme } from "./globalandtheme";
import PageRoutes from "./PageRoutes";
import ApolloWrapper from "./containers/ApolloWrapper";
import { SnackbarProvider } from "notistack";

// start loading firebase auth and current user as early as possible
import "./utils/firebase";

const App = () => {
  return (
    <ApolloWrapper>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <GlobalStyle />
          <Theme>
            <PageRoutes />
          </Theme>
        </Router>
      </SnackbarProvider>
    </ApolloWrapper>
  );
};

export default App;
