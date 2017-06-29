import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';

class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      password: ''
    }
    this.onClickLogin = this.onClickLogin.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState ({
      [e.target.name] : e.target.value
    })
  }

  onClickLogin(event) {
    event.preventDefault();
    console.log('submitted');
    this.props.actions.loginUserDispatcher(this.state);
  }

  render() {
    return (
      <div className="jumbotron text-center">
        <main>
    <center>
      <img className="responsive-img" src="http://i.imgur.com/ax0NCsK.gif" />
      <div className="section"></div>

      <h5 className="white-text">Please, login into your account</h5>
      <div className="section"></div>

      <div className="container">
        <div className="z-depth-1 grey lighten-4 logform row">

          <form className="col s12" onSubmit={this.onClickLogin}>
            <div className="row">
              <div className="col s12">
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input className="validate" type="email" name="email" id="email" onChange={this.onChange}/>
                <label htmlFor="email">Enter your email</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input className="validate" type="password" name="password" id="password" onChange={this.onChange}/>
                <label htmlFor="password">Enter your password</label>
              </div>
              <label className="forgot">
								<a className="pink-text" href="#!"><b>Forgot Password?</b></a>
							</label>
            </div>

            <br />
            <center>
              <div className='row'>
                <button type='submit' name='btn_login' id="login-btn" className='col s12 btn btn-large waves-effect indigo'>Login</button>
              </div>
            </center>
          </form>
        </div>
      </div>
      <a className="white-text create-account" href="/signup">Create account</a>
    </center>
    <div className="section"></div>
    <div className="section"></div>
  </main>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
