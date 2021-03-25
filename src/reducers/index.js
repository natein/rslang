import { combineReducers } from 'redux';
import ebookReducer from './ebookReducer';
import commonReducer from './commonReducer';
import userReducer from './userReducer';
import userWordsReducer from './userWordsReducer';

export default combineReducers({
  ebook: ebookReducer,
  common: commonReducer,
  user: userReducer,
  userWords: userWordsReducer,
});
