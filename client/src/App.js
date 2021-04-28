import React from 'react';
// Apollo Provider imports - Apollo-boost 
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
// import react router for pages feeling to our SPA app.
// switch is used for our catch all route (missing or not used)
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



// our page components imports
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Home from './pages/Home';




// Connection to graphQL server using apollo
// before react app team created fix
// const client = new ApolloClient({
//   uri: 'http://localhost:3001/graphql'
// });
// after react team created fix
const client = new ApolloClient({
  // this is seetting the enviroment to development as it is a 
  // relative path?
  uri: '/graphql'
});

function App() { // our render for our index.js react script
  // <Route exact path="/profile/:username?" component={Profile} />
  // the ? means that the username is optional, why?. When a user
  // is logged in we will display their user name, if not just dipslay thoughts
  // with no logged username.


  // NoMatch is not working for me
  //  <Route component={NoMatch} />
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile/:username?" component={Profile} />
            <Route exact path="/thought/:id" component={SingleThought} />

            <Route component={NoMatch} />
          </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
// Esteban Romero