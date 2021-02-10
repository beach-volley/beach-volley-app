import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyle, Theme } from "./globalandtheme";

import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client'

import PageRoutes from "./PageRoutes";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:5000/graphql',
    credentials: 'include',
  })
})


const query = gql`
{
  matches {
    edges {
      node {
        id
        location
        public
        time {
          start{
            value
          }
        }
      }
    }
  }
}
`

client.query({ query })
  .then((response) => {
    console.log(response.data)
  },(error) => {console.log(error)})
  

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
