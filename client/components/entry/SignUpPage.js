import React from 'react';

class SignupPage extends React.Component {
  render() {
    return (
      <div className="jumbotron text-center">
        <main>
    <center>
      <img className="responsive-img" src="http://i.imgur.com/ax0NCsK.gif" />
      <div className="section"></div>

      <h5 className="white-text">Create a new account</h5>
      <div className="section"></div>

      <div className="container">
        <div className="z-depth-1 grey lighten-4 logform row">

          <form className="col s12" method="post">
            <div className="row">
              <div className="col s12">
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                <input className="validate" type="text" name="firstname" id="firstname" />
                <label htmlFor="firstname">First Name</label>
              </div>

              <div className="input-field col s6">
                <input className="validate" type="text" name="lastname" id="lastname" />
                <label htmlFor="lastname">Last Name</label>
            </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input className="validate" type="text" name="username" id="username" />
                <label htmlFor="username">Username</label>
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

              <div className="input-field col s12">
                <input className="validate" type="password" name="repeat-password" id="repeat-password" />
                <label htmlFor="repeat-password" data-error="Password does not match" data-success="Password Matches">Confirm password</label>
              </div>
            </div>

            <br />
            <center>
              <div className="row">
                <button type="submit" name="btn_login" className="col s12 btn btn-large waves-effect indigo">Register</button>
              </div>
            </center>
          </form>
        </div>
      </div>
    </center>
    <div className="section"></div>
    <div className="section"></div>
  </main>
      </div>
    );
  }
  /**
   * 
   */
  componentDidMount() {
        $('#password').on('focusout', function (e) {
        if ($(this).val() != $('#repeat-password').val()) {
        $('#repeat-password').removeClass('valid').addClass('invalid');
    } else {
        $('#repeat-password').removeClass('invalid').addClass('valid');
    }
});

$('#repeat-password').on('keyup', function (e) {
    if ($('#password').val() != $(this).val()) {
        $(this).removeClass('valid').addClass('invalid');
    } else {
        $(this).removeClass('invalid').addClass('valid');
    }
});
  }
}
export default SignupPage;
