import { combineReducers } from 'redux';
import ebookReducer from './ebookReducer';
import commonReducer from './commonReducer';

export default combineReducers({
  ebook: ebookReducer,
  common: commonReducer
});
