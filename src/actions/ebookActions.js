import { onError } from './commonActions';
import * as ebookService from '../api/ebookService';

export const SET_WORDS = 'SET_WORDS';
export const SET_WORDS_AVERAGE = 'SET_WORDS_AVERAGE';
export const SET_DELETE_WORDS_IN_GROUP = 'SET_DELETE_WORDS_IN_GROUP';
export const SET_WORD_USER = 'SET_WORD_USER';
export const DELETE_WORD_USER = 'DELETE_WORD_USER';
export const WORD_PLAYING = 'WORD_PLAYING';
export const SET_LOADER = 'SET_LOADER';
export const SET_SETTINGS = 'SET_SETTINGS';

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

export const deleteUserWord = (userId, wordId, token) => (dispatch) => {
  //dispatch(setLoader(true));
  return ebookService.deleteUserWord(userId, wordId, token)
    .then(data => dispatch(deleteWordUser(wordId)))
    .then(() => dispatch(onError()))
    .catch((err) => {
      dispatch(onError(err.response ? err.response.data : err.message));
    })
  //.finally(() => dispatch(setLoader(false)));
}

export const loadUserWordAgregate = (userId, token, group = 0, page = 0, isHard = false, isDelete = false, type = '') => (dispatch) => {
  dispatch(setLoader(true));
  return ebookService.getUserWordAgregate(userId, token, group, page, isHard, isDelete, type)
    .then(data => dispatch(setWordsAverage(data)))
    .then(() => dispatch(onError()))
    .catch((err) => {
      dispatch(onError(err.response ? err.response.data : err.message));
      //dispatch(onLogout());
    })
    .finally(() => dispatch(setLoader(false)));
}

export const loadUserDeleteWordAgregateInGroup = (userId, token, group = 0) => (dispatch) => {
  dispatch(setLoader(true));
  return ebookService.getUserDeleteWordAgregateInGroup(userId, token, group)
    .then(data => dispatch(setDeleteWordsAverageInGroup(data)))
    .then(() => dispatch(onError()))
    .catch((err) => {
      dispatch(onError(err.response ? err.response.data : err.message));
      //dispatch(onLogout());
    })
    .finally(() => dispatch(setLoader(false)));
}

export const onUpdateUserWordStatistics = (userId, wordId, token, updateStatisticsCallback) => (dispatch) => {
  return ebookService
    .getUserWord(userId, wordId, token)
    .then((userWord) => updateStatisticsCallback(userWord))
    .then((userWord) =>
      ebookService
        .updateUserWord(userId, wordId, userWord, userWord, token)
        .then((data) => dispatch(setWordUser(data)))
        .then(() => dispatch(onError()))
        .catch((err) => {
          dispatch(onError(err.response ? err.response.data : err.message));
        }),
    );
};

export const createUserWordWithStatistics = (userId, wordId, userWord, token, updateStatisticsCallback) => (
  dispatch,
) => {
  return ebookService
    .createUserWord(userId, wordId, userWord, token)
    .then((data) => dispatch(setWordUser(data)))
    .then(() => dispatch(onError()))
    .catch((err) => {
      if (err.response?.status === 417) {
        dispatch(onUpdateUserWordStatistics(userId, wordId, token, updateStatisticsCallback));
      } else {
        dispatch(onError(err.response ? err.response.data : err.message));
      }
    });
};

export const setWords = (words) => {
  return {
    type: SET_WORDS,
    payload: words
  }
}

export const setWordsAverage = (data) => {
  return {
    type: SET_WORDS_AVERAGE,
    payload: {
      words: data[0]?.paginatedResults,
      totalCount: data[0]?.totalCount[0]?.count
    }
  }
}

export const setDeleteWordsAverageInGroup = (data) => {
  return {
    type: SET_DELETE_WORDS_IN_GROUP,
    payload: {
      words: data[0]?.paginatedResults,
      totalCount: data[0]?.totalCount[0]?.count
    }
  }
}

export const setWordUser = (word) => {
  return {
    type: SET_WORD_USER,
    payload: word
  }
}

export const deleteWordUser = (wordId) => {
  return {
    type: DELETE_WORD_USER,
    payload: wordId
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

export const setSettings = (settings) => {
  return {
    type: SET_SETTINGS,
    payload: settings
  }
}
