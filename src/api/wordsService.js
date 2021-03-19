import axios from 'axios';

const baseUrl = process.env.REACT_APP_API || '';

export const getWords = (page, group) => {
  const url = `${baseUrl}/words?page=${page}&group=${group}`;
  return axios.get(url)
    .then((response) => response.data);
};
