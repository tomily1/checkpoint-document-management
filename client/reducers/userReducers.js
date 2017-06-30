import * as types from '../actions/actionTypes';

export default function userReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_USER:
      return [...state,
        Object.assign({}, action.user)
      ];
    case types.SIGN_IN:
      return [...state,
        Object.assign({}, action.user)
      ];
    default:
      return state;
  }
}
