import * as types from './actionTypes';
import request from 'superagent';
import toastr from 'toastr';

function createUsers(user) {
  return { type: types.CREATE_USER, user };
}
function loginUsers(user) {
  return { type: types.SIGN_IN, user };
}



// thunk
const createUser = (user) => {
  return (
    request
      .post('http://localhost:2000/users').send(user)
      .then((response) => {
        localStorage.setItem('token', response.body.token);
        toastr.success('Successfully signed up!');
        return response.body
      }, (error) => {
        console.log(error);
        toastr.error('Email or Username exists!');
        return error;
      }));
};

const loginUser = (user) => {
  return (
    request
      .post('http://localhost:2000/users/login')
      .send(user)
      .then((response) => {
        localStorage.setItem('token', response.body.token);
        toastr.success('Successfully signed in');
        return response.body
      }, (error) => {
        console.log(error);
        toastr.error(error)
        return error
      }
  ));
};


// action dispatcher
export const createUserDispatcher = newUser => dispatch =>
  createUser(newUser)
    .then((createdUser) => {
      dispatch(createUsers(createdUser));
    }).catch(error => {
      throw error;
  });

export const loginUserDispatcher = loginCredentials => dispatch =>
  loginUser(loginCredentials)
    .then((loggedUser) => {
      dispatch(loginUsers(loggedUser));
    }).catch(error => {
      throw error;
  });