import axios from 'axios';

const baseUrl = process.env.REACT_APP_API || '';

export const getUserStatistics = (userId, token) => {
    const url = `${baseUrl}/users/${userId}/statistics`;
    return axios
        .get(url, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.data);
};

export const updateUserStatistics = (userId, token, statistics) => {
    const url = `${baseUrl}/users/${userId}/statistics`;
    return axios
        .put(url, statistics, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.data);
};