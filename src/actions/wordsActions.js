import * as wordsService from '../api/wordsService';

export const GET_WORDS = 'GET_WORDS';
export const SET_PAGE = 'SET_PAGE';
export const SET_GROUP = 'SET_GROUP';
export const SET_LOADER = 'SET_LOADER';

export const loadWords = () => (dispatch, getState) => {
  dispatch(setLoader(true));
  const { words } = getState();
  return wordsService.getWords(words.page, words.group)
    .then(data => dispatch(setWords(data)))
    .finally(() => dispatch(setLoader(false)));
}

export const setWords = (words) => {
  return {
    type: GET_WORDS,
    payload: words
  }
}

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    payload: page
  }
}

export const setGroup = (group) => {
  return {
    type: SET_GROUP,
    payload: { page: 0, group }
  }
}

export const setLoader = (loader) => {
  return {
    type: SET_LOADER,
    payload: loader
  }
}
