import { combineReducers } from 'redux';
import ebookReducer from './ebookReducer';

export default combineReducers({
  ebook: ebookReducer
});
