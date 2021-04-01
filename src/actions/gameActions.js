import { onError } from './commonActions';
import { setLoader } from './ebookActions';
import * as wordsService from '../api/ebookService';

export const GAME_WORDS_LOADED = 'GAME_WORDS_LOADED';

export const loadWords = (group = 0, page = 0) => (dispatch) => {
    dispatch(setLoader(true));
    return wordsService.getWords(group, page)
        .then((words) => dispatch(onWordsLoaded(words)))
        .then(() => dispatch(onError()))
        .catch((err) => dispatch(onError(err.response ? err.response.data : err.message)))
        .finally(() => dispatch(dispatch(setLoader(false))));
};

export const onWordsLoaded = (words) => ({type: GAME_WORDS_LOADED, payload: words}); 