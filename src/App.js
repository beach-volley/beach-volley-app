import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyle, Theme } from "./globalandtheme";

import PageRoutes from "./PageRoutes";

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Theme>
        <PageRoutes />
      </Theme>
    </Router> 
  );
};

export default App;
