import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import { loginStorage, logoutStorage } from '../middleware/tokenStorageUser';
import { settingsStorage } from '../middleware/settingsStorage';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk, loginStorage, logoutStorage, settingsStorage));
const store = createStore(rootReducer, composedEnhancer);

export default store;
