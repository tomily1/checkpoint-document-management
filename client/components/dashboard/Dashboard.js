import React from 'react';
import jwtDecode from 'jwt-decode';
import Auth from '../../module/Auth';

import DocumentPage from '../documents/documentpage';

/**
 * 
 */
class DashBoard extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: 'User'
    }
  }
  componentDidMount() {
    const token = Auth.getToken();
    const details = jwtDecode(token);
    console.log(details);
    this.setState({
      user: `${details.FirstName} ${details.LastName}`
    });
  }
  render() {
    return (
      <div className="dashboard">
        <h3>Welcome {this.state.user}</h3>
        <p>&nbsp;&nbsp;What would you like to do today?!</p>
      </div>
    );
  }
}
export default DashBoard;
