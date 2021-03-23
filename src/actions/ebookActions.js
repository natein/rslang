import * as ebookService from '../api/ebookService';

export const GET_WORDS = 'GET_WORDS';
export const WORD_PLAYING = 'WORD_PLAYING';
export const SET_LOADER = 'SET_LOADER';

export const loadWords = (group, page) => (dispatch) => {
  dispatch(setLoader(true));
  return ebookService.getWords(group, page)
    .then(data => dispatch(setWords(data)))
    .finally(() => dispatch(setLoader(false)));
}

export const setWords = (words) => {
  return {
    type: GET_WORDS,
    payload: words
  }
}

export const setWordPlaying = (wordsId) => {
  return {
    type: WORD_PLAYING,
    payload: wordsId
  }
}

export const setLoader = (loader) => {
  return {
    type: SET_LOADER,
    payload: loader
  }
}
