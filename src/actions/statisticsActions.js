import * as statisticsService from '../api/statisticsService';

export const GET_USER_STATISTICS = 'GET_USER_STATISTICS';
export const UPDATE_USER_STATISTICS = 'UPDATE_USER_STATISTICS';
export const CLEAR_STATISTICS = 'CLEAR_STATISTICS';

const GET_INITIAL_GAME_INFO = () => ({
    lastChanged: new Date().toLocaleDateString('ru-RU'),
    learnedWords: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    longestSeries: 0,
});

const GET_INITIAL_STATISTICS = () => ({
    learnedWords: 0,
    optional: {
        wordStatistics: {
            [new Date().toLocaleDateString('ru-RU')]: 0,
        },
        gameStatistics: {
            sprint: GET_INITIAL_GAME_INFO(),
            savanna: GET_INITIAL_GAME_INFO(),
            audio: GET_INITIAL_GAME_INFO(),
            own: GET_INITIAL_GAME_INFO(),
        },
    },
});

const updateStatistics = (statistics, isCorrect, game, isNewWord, longestSeries = 0) => {
    const today = new Date().toLocaleDateString('ru-RU');
    statistics.learnedWords += isNewWord ? 1 : 0;
    const { wordStatistics, gameStatistics } = statistics.optional;
    if (wordStatistics[today]) {
        wordStatistics[today] += 1;
    } else {
        wordStatistics[today] = 1;
    }
    let gameInfo = gameStatistics[game];
    if (today !== gameInfo.lastChanged) {
        gameInfo = GET_INITIAL_GAME_INFO();
    }
    gameInfo.learnedWords += isNewWord ? 1 : 0;
    gameInfo.correctAnswers += isCorrect ? 1 : 0;
    gameInfo.wrongAnswers += !isCorrect ? 1 : 0;
    gameInfo.longestSeries = gameInfo.longestSeries < longestSeries ? longestSeries : gameInfo.longestSeries;
    gameStatistics[game] = gameInfo;
    statistics.id = undefined;
    return statistics;
};

export const getUserStatistics = () => (dispatch, getState) => {
    const userInfo = getState().user;
    return statisticsService
        .getUserStatistics(userInfo.userId, userInfo.token)
        .then((data) => dispatch(setUserStatistics(data)))
        .catch((error) => {});
};

export const updateUserStatistics = (isCorrect, game, isNewWord, gameStatistics) => (dispatch, getState) => {
    const userInfo = getState().user;
    console.log(gameStatistics);
    return statisticsService
        .getUserStatistics(userInfo.userId, userInfo.token)
        .catch((error) => {
            if (error.response?.status === 404) {
                return JSON.parse(JSON.stringify(GET_INITIAL_STATISTICS()));
            }
            throw error;
        })
        .then((statistics) => updateStatistics(statistics, isCorrect, game, isNewWord, gameStatistics.longestSeries))
        .then((statistics) => statisticsService.updateUserStatistics(userInfo.userId, userInfo.token, statistics))
        .catch((error) => console.log(error));
};

export const setUserStatistics = (statistics) => ({
    type: UPDATE_USER_STATISTICS,
    payload: statistics,
});


export const clearUserStatistics = () => ({
    type: CLEAR_STATISTICS
});
