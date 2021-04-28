import React from 'react';
// Link will change the URL while staying on the same page
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';



// Use of react links in order to say on the page 
// while "moving URL" as to avoid talking to the server side
const Header = () => {

  // logout function 
  const logout = event => {
    // this will stop the a element from refreshing the page
    event.preventDefault();
    Auth.logout();
  };


  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1>Deep Thoughts</h1>
        </Link>

        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
