import React from 'react';
import { Link } from 'react-router';
import Auth from '../../module/Auth';

class HomePage extends React.Component {
  render() {
    return (

        !Auth.isUserAuthenticated() ? (
          <div className="jumbotron text-center">
            <div>
              <h1>Document Management</h1>
              <p>Whole new meaning to documents....</p>
              <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
            </div>
            <div className="login text-center">
              <Link to="login" className="btn btn-warning btn-link-no-spacing btn-sm">Login</Link>
            </div>
          </div>
          ) :(
          <div className="jumbotron text-center">
              <h1>Document Management</h1>
              <p>Whole new meaning to documents....</p>
              <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
          </div>
        )
    );
  }
}
export default HomePage;
