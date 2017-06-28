import {combineReducers} from 'redux';
import documents from './documentReducers';
import users from './userReducers';

const rootReducer = combineReducers({
  documents,
  users
});
export default rootReducer;
