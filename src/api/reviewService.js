import axios from 'axios';

const baseUrl = process.env.REACT_APP_API || '';

export const getReview = () => {
  const url = `${baseUrl}/review`;

  return axios.get(url)
    .then((response) => response.data);
};

export const putReview = (dataReview) => {
  const url = `${baseUrl}/review`;
  
  return axios.put(url, dataReview)
    // .then((response) => console.log(response));
};
