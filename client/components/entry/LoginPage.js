import React from 'react';

class LoginPage extends React.Component {
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

          <form className="col s12" method="post">
            <div className="row">
              <div className="col s12">
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input className="validate" type="email" name="email" id="email" />
                <label htmlFor="email">Enter your email</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input className="validate" type="password" name="password" id="password" />
                <label htmlFor="password">Enter your password</label>
              </div>
              <label className="forgot">
								<a className="pink-text" href="#!"><b>Forgot Password?</b></a>
							</label>
            </div>

            <br />
            <center>
              <div className='row'>
                <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Login</button>
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
export default LoginPage;
