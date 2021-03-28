import { combineReducers } from 'redux';
import ebookReducer from './ebookReducer';
import commonReducer from './commonReducer';
import userReducer from './userReducer';
import userWordsReducer from './userWordsReducer';
import gameReducer from './gameReducer';

export default combineReducers({
  ebook: ebookReducer,
  common: commonReducer,
  user: userReducer,
  userWords: userWordsReducer,
  game: gameReducer
});
