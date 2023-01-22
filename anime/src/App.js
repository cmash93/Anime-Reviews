import React from 'react';
import {
  createHttpLink,
  ApolloClient,
  InMemoryCache, 
  ApolloProvider
} from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import SearchAnime from './pages/SearchAnime';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';





const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },

  urt: "/grahpql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Profile} />
          <Route exact path='/' component={SearchAnime} />
        </Switch>
        <Footer />
        
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
