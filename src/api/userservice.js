import axios from 'axios';

const baseUrl = process.env.REACT_APP_API || '';

export const createNewUser = (username, password, avatar) => {
    const url = `${baseUrl}/users`;
    return axios
        .post(
            url,
            {
                name: username,
                email: username,
                password,
                avatar,
            }
        )
        .then((response) => response.data)
        .catch((err) => {
            if (err.response?.status === 413) {
                throw new Error('Image avatar is too high. Please choose smaller image');
            }
            if (err.response?.status === 422) {
                throw new Error('Invalid email or password was specified');
            }
            throw err;
        });
};

export const login = (username, password) => {
    const url = `${baseUrl}/signin`;
    return axios
        .post(
            url,
            {
                email: username,
                password,
            }
        )
        .then((response) => response.data);
};

export const getUserById = (id, token) => {
    const url = `${baseUrl}/users/${id}`;
    return axios
        .get(
            url,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        )
        .then((response) => response.data);
};
