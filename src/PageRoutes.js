import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import GameListing from "./pages/GameListing";
import GameCreation from "./pages/GameCreation";

const PageRoutes = () => {
  return (
    <Switch>
      <Route path="/home" component={GameListing} />
      <Route path="/game-creation" component={GameCreation} />
      <Route path="/" component={GameListing}>
        <Redirect to="/home" />
      </Route>
    </Switch>
  );
};

export default PageRoutes;
