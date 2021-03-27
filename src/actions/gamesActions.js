import * as ebookService from '../api/ebookService';

import { GAMES } from '../constants/index';

export const GAME_INIT = 'GAME_INIT';
export const OPEN_CROSSMODAL = 'OPEN_CROSSMODAL';
export const CLOSE_CROSSMODAL = 'CLOSE_CROSSMODAL';
export const CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY';
export const TIMER = 'TIMER';

export const loadWords = (group = 2, page = 1) => (dispatch) => {
    return ebookService.getWords(group, page)
        .then(data => {
            dispatch(changeDifficulty(data))
        })
}

export const startTimer = () => (dispatch) => {
    dispatch(setTimer(true));
    setTimeout(() => {
        dispatch(setTimer(false))
    }, GAMES.timeout);
}

export const gameInit = () => {
    return {
        type: GAME_INIT
    }
}

export const openCrossModal = () => {
    return {
        type: OPEN_CROSSMODAL
    }
}
export const setTimer = (timer) => {
    return {
        type: TIMER,
        payload: timer
    }
}
export const closeCrossModal = () => {
    return {
        type: CLOSE_CROSSMODAL
    }
}
export const changeDifficulty = (words) => {
    return {
        type: CHANGE_DIFFICULTY,
        payload: words
    }
}
