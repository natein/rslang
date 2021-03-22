import axios from 'axios';

const baseUrl = process.env.REACT_APP_API || '';

export const getWords = (group, page) => {
  console.log(group, page);
  const url = `${baseUrl}/words?page=${page - 1}&group=${group - 1}`;
  return axios.get(url)
    .then((response) => response.data);
};
