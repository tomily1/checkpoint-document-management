import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';

class SignupPage extends React.Component {

  constructor(props, context){
    super(props, context);
    this.state = {
        'firstname': '',
        'lastname': '',
        'username': '',
        'email': '',
        'password': ''
    };
    this.onClickRegister = this.onClickRegister.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onClickRegister(event){
    event.preventDefault();
    console.log(this.state);
    this.props.actions.createUserDispatcher(this.state);
  }

  onChange(e) {
    this.setState ({
      [e.target.name]: e.target.value
    })
  }

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

          <form className="col s12" onSubmit={this.onClickRegister} >
            <div className="row">
              <div className="col s12">
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                <input className="validate" type="text" name="firstname" id="firstname" onChange={this.onChange}/>
                <label htmlFor="firstname">First Name</label>
              </div>

              <div className="input-field col s6">
                <input className="validate" type="text" name="lastname" id="lastname" onChange={this.onChange}/>
                <label htmlFor="lastname">Last Name</label>
            </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input className="validate" type="text" name="username" id="username" onChange={this.onChange}/>
                <label htmlFor="username">Username</label>
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
                <span className="red-text password-length"></span>
              </div>

              <div className="input-field col s12">
                <input className="validate" type="password" name="repeat-password" id="repeat-password" />
                <label htmlFor="repeat-password" data-error="Password does not match" data-success="Password Matches">Confirm password</label>
              </div>
            </div>

            <br />
            <center>
              <div className="row">
                <button type="submit" id="register-btn" name="btn_login" className="col s12 btn btn-large waves-effect indigo" disabled="disabled">Register</button>
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

      $('.password-length').text('Password should be up to 8 alphabets');

      if ($(this).val().length >= 8){
        $('.password-length').text('');
      }
      if ($(this).val() != $('#repeat-password').val()) {
        $('#repeat-password').removeClass('valid').addClass('invalid');
      } else {
          $('#repeat-password').removeClass('invalid').addClass('valid');
      }
    });

    $('#repeat-password').on('keyup', function (e) {
      if ($('#password').val() != $(this).val()) {
        $(this).removeClass('valid').addClass('invalid');
        $("#register-btn").attr("disabled", true);
      } else {
        $(this).removeClass('invalid').addClass('valid');
        $("#register-btn").removeAttr('disabled');
      }
    });
  }

}

const mapStateToProps = (state) => {
  return {
    newUser: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
