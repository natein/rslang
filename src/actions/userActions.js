import { onError } from './commonActions';
import { setLoader } from './ebookActions';
import * as userLoginService from '../api/userLoginService';

export const USER = 'USER';
export const USER_LOGOUT = 'USER_LOGOUT';

export const createNewUser = (username, password, avatar) => (dispatch) => {
    dispatch(setLoader(true));
    return userLoginService
        .createNewUser(username, password, avatar)
        .then((data) => dispatch(onUpdateUserData(data)))
        .then(() => dispatch(onError()))
        .catch((err) => dispatch(onError(err.response ? err.response.data : err.message)))
        .finally(() => dispatch(dispatch(setLoader(false))));
};

export const onLogin = (username, password) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const data = await userLoginService.login(username, password);
        const userInfo = await userLoginService.getUserById(data.userId, data.token);

        dispatch(onUpdateUserData({ ...data, ...userInfo }));
        dispatch(onError());
    } catch (err) {
        dispatch(onError(err.response ? err.response.data : err.message));
    } finally {
        dispatch(setLoader(false));
    }
};

export const onLogout = () => {
    return {
        type: USER_LOGOUT,
    };
};

export const onUpdateUserData = (data) => {
    return {
        type: USER,
        payload: data,
    };
};

export const updateToken = () => (dispatch, getState) => {
    const user = getState().user;
    if (!!(user?.id) && !user.blocked) {
        dispatch(onUpdateUserData({...user, blocked: true}))
        dispatch(setLoader(true));
        return userLoginService
            .updateToken(user.id, user.refreshToken)
            .then((data) => dispatch(onUpdateUserData({...user, ...data, blocked: false})))
            .catch(() => dispatch(onLogout()))
            .finally(() => {
                dispatch(setLoader(false));
            });
    }
};
