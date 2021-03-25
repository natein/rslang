import { onError } from './commonActions';
import { setLoader } from './ebookActions';
import * as userLoginService from '../api/userLoginService';

export const createNewUser = (username, password, avatar) => (dispatch) => {
    dispatch(setLoader(true));
    return userLoginService
        .createNewUser(username, password, avatar)
        .then((data) => dispatch({ type: 'USER', payload: data }))
        .then(() => dispatch(onError()))
        .catch((err) => dispatch(onError(err.response ? err.response.data : err.message)))
        .finally(() => dispatch(dispatch(setLoader(false))));
};

export const logout = () => (dispatch) => {
    dispatch({ type: 'USER_LOGOUT' });
};

export const onLogin = (username, password) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const data = await userLoginService.login(username, password);
        const userInfo = await userLoginService.getUserById(data.userId, data.token);

        dispatch({ type: 'USER', payload: { ...data, ...userInfo } });
        dispatch(onError());
    } catch (err) {
        dispatch(onError(err.response ? err.response.data : err.message));
    } finally {
        dispatch(setLoader(false));
    }
};

export const onLogout = () => ({ type: 'USER_LOGOUT' });
