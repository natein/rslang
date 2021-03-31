import axios from 'axios';
import { COUNT_WORDS_ON_PAGE } from '../constants';

const baseUrl = process.env.REACT_APP_API || '';

export const getWords = (group, page) => {
  const url = `${baseUrl}/words?page=${page - 1}&group=${group - 1}`;
  return axios.get(url)
    .then((response) => response.data);
};

export const getUserWord = (userId, wordId, token) => {
  const url = `${baseUrl}/users/${userId}/words/${wordId}`
  return axios.get(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then((response) => response.data);
};


export const createUserWord = (userId, wordId, word, token) => {
  const url = `${baseUrl}/users/${userId}/words/${wordId}`;
  return axios.post(url, word, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then((response) => response.data)
    .catch((err) => {
      if (err.response?.status === 401) {
        throw new Error('Необходимо авторизоваться');
      }
      throw err;
    });
};

export const updateUserWord = (userId, wordId, word, userWord, token) => {
  const url = `${baseUrl}/users/${userId}/words/${wordId}`;

  const data = {};
  if (word?.difficulty) data.difficulty = word.difficulty;
  if (word?.optional) data.optional = { ...userWord?.optional, ...word?.optional }

  return axios.put(url, data, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then((response) => response.data)
    .catch((err) => {
      if (err.response?.status === 401) {
        throw new Error('Необходимо авторизоваться');
      }
      throw err;
    });
};

export const deleteUserWord = (userId, wordId, token) => {
  const url = `${baseUrl}/users/${userId}/words/${wordId}`;
  return axios.delete(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then((response) => response.data)
    .catch((err) => {
      if (err.response?.status === 401) {
        throw new Error('Необходимо авторизоваться');
      }
      throw err;
    });
};

export const getUserWordAgregate = (userId, token, group, page, isHard, isDelete, type) => {
  const url = `${baseUrl}/users/${userId}/aggregatedWords`;

  let filter = `{ "$and": [{ "page": ${page - 1} }, {"group": ${group - 1}}, { "userWord.optional.isDelete": null }] }`;

  if (isHard) {
    filter = '{ "$and": [{ "userWord.difficulty": "hard" }] }';
  }

  if (isDelete) {
    filter = `{ "$and": [{ "userWord.optional.isDelete": true }, { "page": ${page - 1} }, {"group": ${group - 1}}] }`;
  }

  if (type === 'study') {
    filter = `{ "$and": [{ "$or": [{ "userWord.difficulty": "hard" }] }, { "userWord.optional.isDelete": null }] }`;
  }

  if (type === 'hard') {
    filter = `{ "$and": [{ "userWord.difficulty": "hard" }, { "userWord.optional.isDelete": null }] }`;
  }

  if (type === 'delete') {
    filter = `{ "$and": [{ "userWord.optional.isDelete": true }] }`;
  }

  return axios.get(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    params: {
      filter: filter,
      wordsPerPage: type ? 3600 : COUNT_WORDS_ON_PAGE
    }
  })
    .then((response) => response.data)
    .catch((err) => {
      if (err.response?.status === 401) {
        throw new Error('Необходимо авторизоваться');
      }
      throw err;
    });
};

export const getUserDeleteWordAgregateInGroup = (userId, token, group) => {
  const url = `${baseUrl}/users/${userId}/aggregatedWords`;

  let filter = `{ "$and": [{"group": ${group - 1}}, { "userWord.optional.isDelete": true }] }`;

  return axios.get(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    params: {
      filter: filter,
      wordsPerPage: 600
    }
  })
    .then((response) => response.data)
    .catch((err) => {
      if (err.response?.status === 401) {
        throw new Error('Необходимо авторизоваться');
      }
      throw err;
    });
};
