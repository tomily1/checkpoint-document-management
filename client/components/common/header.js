import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return (
    <nav className="navbar navbar-light">
      <div className="navbar-wrapper">
        <IndexLink to="/" activeClassName="active">Home</IndexLink>
        {' | '}
        <Link to="/dashboard" activeClassName="active">Dashboard</Link>
        {' | '}
        <Link to="/documents" activeClassName="active">Documents</Link>
        {' | '}
        <Link to="/about" activeClassName="active">About</Link>
        <div className="nav-edge">
          <Link to="/profile" activeClassName="active">Profile</Link>
          {' | '}
          <Link to="/signup" activeClassName="active">Sign up</Link>
          {' | '}
          <Link to="/login" activeClassName="active">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
