import { onError } from './commonActions';
import * as ebookService from '../api/ebookService';
import * as statisticsActions from './statisticsActions';

export const SET_WORDS = 'SET_WORDS';
export const SET_WORDS_AVERAGE = 'SET_WORDS_AVERAGE';
export const SET_DELETE_WORDS_IN_GROUP = 'SET_DELETE_WORDS_IN_GROUP';
export const SET_WORD_USER = 'SET_WORD_USER';
export const DELETE_WORD_USER = 'DELETE_WORD_USER';
export const WORD_PLAYING = 'WORD_PLAYING';
export const SET_LOADER = 'SET_LOADER';
export const SET_SETTINGS = 'SET_SETTINGS';

const GET_INITIAL_USER_WORD = (gameName) => ({
  optional: { game: true, [gameName]: { right: 0, wrong: 0 }, lastChanged: new Date().toLocaleDateString('ru-RU') },
});

const UPDATE_WORD_STATISTICS = (userWord, isCorrect, gameName) => {
  let wordStatistics;
  if (userWord?.optional && userWord.optional[gameName]) {
    wordStatistics = userWord.optional[gameName];
  } else {
    wordStatistics = { right: 0, wrong: 0 };
  }

  if (isCorrect) {
    wordStatistics.right += 1;
  } else {
    wordStatistics.wrong += 1;
  }

  if (!userWord.optional) {
    userWord.optional = {};
  }

  userWord.optional[gameName] = wordStatistics;
  return userWord;
};

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

export const onUpdateUserWordStatistics = (wordId, isCorrect, gameName, gameStatistics) => (dispatch, getState) => {
  const {userId, token} = getState().user;
  const today = new Date().toLocaleDateString('ru-RU');
  return ebookService
      .getUserWord(userId, wordId, token)
      .then((userWord) => UPDATE_WORD_STATISTICS(userWord, isCorrect, gameName))
      .then(async (userWord) => {
          const updatedUserWord = {...userWord, optional: {...userWord, lastChanged: new Date().toLocaleDateString('ru-RU')}};
          await ebookService
              .updateUserWord(userId, wordId, updatedUserWord, updatedUserWord, token)
              .then((data) => dispatch(setWordUser(data)))
              .then(() => dispatch(onError()))
              .catch((err) => {
                  dispatch(onError(err.response ? err.response.data : err.message));
              });
          return userWord;
      }).then((userWord) => {
        return dispatch(statisticsActions.updateUserStatistics(isCorrect, gameName, today !== userWord.optional.lastChanged, gameStatistics))
      });
};

export const createUserWordWithStatistics = (wordId, isCorrect, gameName, gameStatistics) => (
  dispatch, getState
) => {
  const { userId, token } = getState().user;
  const userWord = UPDATE_WORD_STATISTICS(GET_INITIAL_USER_WORD(gameName), isCorrect, gameName);
  return ebookService
      .createUserWord(userId, wordId, userWord, token)
      .then((data) => dispatch(setWordUser(data)))
      .then(() => dispatch(onError()))
      .then(() => dispatch(statisticsActions.updateUserStatistics(isCorrect, gameName, true, gameStatistics)))
      .catch((err) => {
          if (err.response?.status === 417) {
              dispatch(onUpdateUserWordStatistics(wordId, isCorrect, gameName, gameStatistics));
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
