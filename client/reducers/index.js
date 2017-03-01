import {combineReducers} from 'redux';
import documents from './documentReducers';

const rootReducer = combineReducers({
  documents
});
export default rootReducer;
