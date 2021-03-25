import axios from 'axios';

const baseUrl = process.env.REACT_APP_API || '';

export const getUserWord = (userId, wordId, token) => {
  const url = `${baseUrl}/users/${userId}/words/${wordId}`
  return axios.get(url, {
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    }
  })
    .then((response) => response.data);
};


export const createUserWord = (userId, wordId, word, token) => {
  const url = `${baseUrl}/users/${userId}/words/${wordId}`;
  return axios.post(url, word, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then((response) => response.data);
};
