import { combineReducers } from 'redux';
import wordsReducer from './wordsReducer';

export default combineReducers({
  words: wordsReducer
});
