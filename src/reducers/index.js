import { combineReducers } from 'redux';
import ebookReducer from './ebookReducer';
import commonReducer from './commonReducer';
import userReducer from './userReducer';
import gameReducer from './gameReducer';
import statisticsReducer from './statisticsReducer';

export default combineReducers({
  ebook: ebookReducer,
  common: commonReducer,
  user: userReducer,
  game: gameReducer,
  statistics: statisticsReducer,
});
