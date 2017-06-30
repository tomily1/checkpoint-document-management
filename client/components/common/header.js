import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../../module/Auth';

const Header = () => {
  return (
    <nav className="navbar navbar-light">
      <div className="navbar-wrapper">
        <IndexLink to="/" activeClassName="active">Home</IndexLink>
        {' | '}
        <Link to="/about" activeClassName="active">About</Link>
        {Auth.isUserAuthenticated() ? (
          <span>
            {' | '}
            <Link to="/dashboard" activeClassName="active">Dashboard</Link>
            {' | '}
            <Link to="/documents" activeClassName="active">Documents</Link>
          </span>
        ) : (
            <div></div>
        )}

        {Auth.isUserAuthenticated() ? (
          <div className="nav-edge">
            <Link to="/profile" activeClassName="active">Profile</Link>
            {' | '}
            <Link to="/logout" activeClassName="active">Logout</Link>
          </div>
        ): (
          <div className="nav-edge logged-out">
            <Link to="/signup" activeClassName="active">Sign up</Link>
            {' | '}
            <Link to="/login" activeClassName="active">Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
