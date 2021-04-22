import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import GameListing from "./pages/GameListing";
import GameCreation from "./pages/GameCreation";
import SingleGame from "./pages/SingleGame";
import LoginPage from "./pages/LoginPage";

const PageRoutes = () => {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/games" component={GameListing} />
      <Route path="/create-game" component={GameCreation} />
      <Route path="/single-game" component={SingleGame} />
      <Route path="/" component={GameListing}>
        <Redirect to="/games" />
      </Route>
    </Switch>
  );
};

export default PageRoutes;
