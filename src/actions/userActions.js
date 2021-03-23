import { onError, setLoader } from './commonActions';
import * as userService from '../api/userservice';

export const createNewUser = (username, password, avatar) => (dispatch) => {
    dispatch(setLoader(true));
    return userService
        .createNewUser(username, password, avatar)
        .then((data) => dispatch({ type: 'USER', payload: data }))
        .catch((err) => dispatch(onError(err.response ? err.response.data : err)))
        .finally(() => dispatch(dispatch(setLoader(false))));
};

export const logout = () => (dispatch) => {
    dispatch({ type: 'USER_LOGOUT' });
    document.cookie = 'AUTH; Max-Age=-99999999;';
};

export const onLogin = (username, password) => (dispatch) => {
    dispatch(setLoader(true));
    return userService
        .login(username, password)
        .then((data) => dispatch({ type: 'USER', payload: data }))
        .catch((err) => dispatch(onError(err.response ? err.response.data : err)))
        .finally(() => dispatch(dispatch(setLoader(false))));
};

export const onAutoLogin = () => (dispatch) => {
    dispatch(setLoader(true));
    return userService
        .autoLogin()
        .then((data) => dispatch({ type: 'USER', payload: data }))
        .catch((err) => console.log('Autologin failed', err))
        .finally(() => dispatch(dispatch(setLoader(false))));
};

export const onLogout = () => (dispatch) => {
    dispatch(setLoader(true));
    return userService
        .logout()
        .then(() => dispatch({ type: 'USER_LOGOUT' }))
        .catch((err) => console.log('Autologin failed', err))
        .finally(() => dispatch(dispatch(setLoader(false))));
};