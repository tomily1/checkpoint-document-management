import * as types from './actionTypes';
import request from 'superagent';

function createUsers(user) {
  return { type: types.CREATE_USER, user };
}

// thunk
const createUser = (user) => {
  console.log(user)
  return (
    request
      .post('http://localhost:2000/users').send(user)
      .then((response) => {
        console.log(response);
        return response
      }, (error) => {
        console.log(error);
        return error
      }))
};


// action dispatcher
export const createUserDispatcher = newUser => dispatch =>
  createUser(newUser)
    .then((createdUser) => {
      dispatch(createUsers(createdUser));
    }).catch(error => {
      throw error;
  }) ;