/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Savanna from '../components/SavannaGame/Savanna/Savanna';
import { loadSavannaWords } from '../actions/gameActions';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import LoadingPage from '../components/LoadingPage';
import styled from 'styled-components';
import * as userWordsActions from '../actions/ebookActions';
import { useRouteMatch } from 'react-router';
import FullScreen from '../components/FullScreen';

const SavannaWrapper = styled(Box)`
    display: flex;
`;

function SavannaPage({
    loadSavannaWords = (f) => f,
    onCreateUserWord = (f) => f,
    onUpdateUserWordStatistics = (f) => f,
    loader,
    error,
    userId,
    token,
    wordsList,
}) {
    const match = useRouteMatch({
        path: '/games/savanna/new',
        strict: true,
        sensitive: true,
    });

    const gameRef = useRef();
    const [difficultyLvl, setDifficultyLvl] = useState(2);

    function setDifficultyHandle({ target }) {
        setDifficultyLvl(target.value);
    }

    useEffect(() => {
        if (match || !wordsList.length) {
            loadSavannaWords(difficultyLvl);
        }
    }, [difficultyLvl, loadSavannaWords]);

    const onAddWordToDictionary = (wordId, word, isCorrect, currentGameStatistics) => {
        if (userId && token) {
            if (word.userWord) {
                onUpdateUserWordStatistics(wordId, isCorrect, currentGameStatistics);
            } else {
                onCreateUserWord(wordId, isCorrect, currentGameStatistics);
            }
        }
    };

    return (
        <SavannaWrapper ref={gameRef}>
            {loader && <LoadingPage />}
            {error && <>Ошибка: {error}</>}
            {!loader && !error && (
                <Savanna
                    setDifficulty={setDifficultyHandle}
                    onAddWordToDictionary={onAddWordToDictionary}
                    difficultyLvl={difficultyLvl}
                    match={match}
                />
            )}
            <FullScreen reference={gameRef} />
        </SavannaWrapper>
    );
}

const mapStateToProps = (state) => {
    return {
        loader: state.ebook.loader,
        error: state.common.error,
        userId: state.user.id,
        token: state.user.token,
        wordsList: state.game.wordsList,
    };
};

const mapDispatchToProps = (dispatch) => ({
    loadSavannaWords: (group) => dispatch(loadSavannaWords(group)),
    onCreateUserWord: (wordId, isCorrect, currentGameStatistics) =>
        dispatch(userWordsActions.createUserWordWithStatistics(wordId, isCorrect, 'savanna', currentGameStatistics)),
    onUpdateUserWordStatistics: (wordId, isCorrect, currentGameStatistics) =>
        dispatch(userWordsActions.onUpdateUserWordStatistics(wordId, isCorrect, 'savanna', currentGameStatistics)),
});

SavannaPage.propTypes = {
    loadSavannaWords: PropTypes.func.isRequired,
    onCreateUserWord: PropTypes.func.isRequired,
    onUpdateUserWordStatistics: PropTypes.func.isRequired,
    loader: PropTypes.bool,
    error: PropTypes.string,
    userId: PropTypes.string,
    token: PropTypes.string,
    match: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(SavannaPage);
