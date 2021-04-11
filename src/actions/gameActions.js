import { onError } from './commonActions';
import { setLoader } from './ebookActions';
import * as wordsService from '../api/ebookService';

export const GAME_WORDS_LOADED = 'GAME_WORDS_LOADED';
export const GET_SAVANNA_WORDS = 'GET_SAVANNA_WORDS';
export const INIT_SAVANNA_LIFE = 'INIT_SAVANNA_LIFE';
export const LOST_SAVANNA_LIFE = 'LOST_SAVANNA_LIFE';

export const loadWords = (group = 0, page = 0) => (dispatch) => {
    dispatch(setLoader(true));
    return wordsService.getWords(group, page)
        .then((words) => dispatch(onWordsLoaded(words)))
        .then(() => dispatch(onError()))
        .catch((err) => dispatch(onError(err.response ? err.response.data : err.message)))
        .finally(() => dispatch(dispatch(setLoader(false))));
};

export const loadSavannaWords = (group) => (dispatch) => {
    dispatch(setLoader(true));
    return wordsService.getGroupWords(group)
        .then((words) => dispatch(getWordsSavanna(words)))
        .then(() => dispatch(onError()))
        .catch((err) => { dispatch(onError(err.response ? err.response.data : err.message))})
        .finally(() => dispatch(dispatch(setLoader(false))));
};

export const onWordsLoaded = (words) => ({ type: GAME_WORDS_LOADED, payload: words })
export const getWordsSavanna = (words) => ({ type: GET_SAVANNA_WORDS, payload: words })
export const initLife = () => ({ type: INIT_SAVANNA_LIFE, })
export const setLostLife = (id) => ({ type: LOST_SAVANNA_LIFE, payload: id })
