import * as userWordsService from '../api/userWordsService';

export const SET_WORD = 'USERWORDS/SET_WORD';
export const SET_LOADER = 'USERWORDS/SET_LOADER';

export const loadUserWord = (userId, wordId, token) => (dispatch) => {
  dispatch(setLoader(true));
  return userWordsService.getUserWord(userId, wordId, token)
    .then(data => dispatch(console.log(data)))
    .finally(() => dispatch(setLoader(false)));
}

export const createUserWord = (userId, wordId, word, token) => (dispatch) => {
  dispatch(setLoader(true));
  return userWordsService.createUserWord(userId, wordId, word, token)
    .then(data => dispatch(setWord(data)))
    .finally(() => dispatch(setLoader(false)));
}

export const setWord = (userWord) => {
  return {
    type: SET_WORD,
    payload: userWord.wordId
  }
}

export const setLoader = (loader) => {
  return {
    type: SET_LOADER,
    payload: loader
  }
}
