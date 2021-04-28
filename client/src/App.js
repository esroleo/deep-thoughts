import React from 'react';
// Apollo Provider imports - Apollo-boost 
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';


// Connection to graphQL server using apollo
// before react app team created fix
// const client = new ApolloClient({
//   uri: 'http://localhost:3001/graphql'
// });
// after react team created fix
const client = new ApolloClient({
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
// Esteban Romero