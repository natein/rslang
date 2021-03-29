import { onError } from './commonActions';
import * as ebookService from '../api/ebookService';

export const SET_WORDS = 'SET_WORDS';
export const SET_WORDS_AVERAGE = 'SET_WORDS_AVERAGE';
export const SET_WORD_USER = 'SET_WORD_USER';
export const WORD_PLAYING = 'WORD_PLAYING';
export const SET_LOADER = 'SET_LOADER';

export const loadWords = (group, page) => (dispatch) => {
  dispatch(setLoader(true));
  return ebookService.getWords(group, page)
    .then(data => dispatch(setWords(data)))
    //.then(data => console.log(data))
    .finally(() => dispatch(setLoader(false)));
}

export const loadUserWord = (userId, wordId, token) => (dispatch) => {
  dispatch(setLoader(true));
  return ebookService.getUserWord(userId, wordId, token)
    .then(data => dispatch(console.log(data)))
    .finally(() => dispatch(setLoader(false)));
}

export const createUserWord = (userId, wordId, word, token) => (dispatch) => {
  //dispatch(setLoader(true));
  return ebookService.createUserWord(userId, wordId, word, token)
    .then(data => dispatch(setWordUser(data)))
    .then(() => dispatch(onError()))
    .catch((err) => {
      dispatch(onError(err.response ? err.response.data : err.message));
    })
  //.finally(() => dispatch(setLoader(false)));
}

export const updateUserWord = (userId, wordId, word, token) => (dispatch) => {
  //dispatch(setLoader(true));
  ebookService.getUserWord(userId, wordId, token).then(userWord => {
    return ebookService.updateUserWord(userId, wordId, word, userWord, token)
      .then(data => dispatch(setWordUser(data)))
      .then(() => dispatch(onError()))
      .catch((err) => {
        dispatch(onError(err.response ? err.response.data : err.message));
      });
  });
}

export const loadUserWordAgregate = (userId, token, group = 0, page = 0, isHard = false, isDelete = false) => (dispatch) => {
  dispatch(setLoader(true));
  return ebookService.getUserWordAgregate(userId, token, group, page, isHard, isDelete)
    .then(data => dispatch(setWordsAverage(data[0].paginatedResults)))
    //.then(data => console.log(data[0].paginatedResults))
    .then(() => dispatch(onError()))
    .catch((err) => {
      dispatch(onError(err.response ? err.response.data : err.message));
      //dispatch(onLogout());
    })
    .finally(() => dispatch(setLoader(false)));
}

export const setWords = (words) => {
  return {
    type: SET_WORDS,
    payload: words
  }
}

export const setWordsAverage = (words) => {
  return {
    type: SET_WORDS_AVERAGE,
    payload: words
  }
}

export const setWordUser = (word) => {
  return {
    type: SET_WORD_USER,
    payload: word
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
