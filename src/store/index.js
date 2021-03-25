import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import { loginStorage, logoutStorage } from '../middleware/tokenStorageUser';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk, loginStorage, logoutStorage));
const store = createStore(rootReducer, composedEnhancer);

export default store;
