import { onError } from './commonActions';
import { setLoader } from './ebookActions';
import * as ebookService from '../api/ebookService';
import { GAMES } from '../constants/index';

export const GAME_WORDS_LOADED = 'GAME_WORDS_LOADED';
export const TIMER = 'TIMER';
export const GET_SAVANNA_WORDS = 'GET_SAVANNA_WORDS';

export const loadWords = (group = 0, page = 0) => (dispatch) => {
    dispatch(setLoader(true));
    return ebookService.getWords(group, page)
        .then((words) => dispatch(onWordsLoaded(words)))
        .then(() => dispatch(onError()))
        .catch((err) => dispatch(onError(err.response ? err.response.data : err.message)))
        .finally(() => dispatch(dispatch(setLoader(false))));
};

export const preloadSavannaTimer = (group = 0, page = 0) => (dispatch) => {
    dispatch(setTimer(true));
    setTimeout(() => {
        return ebookService.getWords(group, page)
            .then((words) => dispatch(onWordsLoaded(words)))
            .then(() => dispatch(getWordsForSavanna()))
            .then(() => dispatch(onError()))
            .catch((err) => dispatch(onError(err.response ? err.response.data : err.message)))
            .finally(() => dispatch(dispatch(setTimer(false))));
    }, GAMES.timeout);
}


export const onWordsLoaded = (words) => ({ type: GAME_WORDS_LOADED, payload: words });
export const setTimer = (timer) => ({ type: TIMER, payload: timer });
export const getWordsForSavanna = () => ({ type: GET_SAVANNA_WORDS })

