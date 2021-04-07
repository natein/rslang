/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Savanna from '../components/SavannaGame/Savanna/Savanna';
import { loadSavannaWords } from '../actions/gameActions';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import LoadingPage from '../components/LoadingPage';
import { onFullScreen } from '../helpers';
import styled from 'styled-components';
import * as userWordsActions from '../actions/ebookActions';
import { useRouteMatch } from 'react-router';

const SavannaWrapper = styled(Box)`
    display: flex;
`;

const FullScreenOuter = styled(Button)`
    top: 0;
    color: white;
    right: 0;
    margin: 0;
    padding: 0;
    position: absolute;
    min-width: auto;
    margin-right: 30px;
    margin-top: 15px;
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

    const onAddWordToDictionary = (wordId, word, isCorrect) => {
        if (userId && token) {
            if (word.userWord) {
                onUpdateUserWordStatistics(wordId, isCorrect);
            } else {
                onCreateUserWord(wordId, isCorrect);
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

            <FullScreenOuter onClick={() => onFullScreen(gameRef)}>
                <FullscreenIcon fontSize="large" />
            </FullScreenOuter>
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
    onCreateUserWord: (wordId, isCorrect) =>
        dispatch(userWordsActions.createUserWordWithStatistics(wordId, isCorrect, 'savanna')),
    onUpdateUserWordStatistics: (wordId, isCorrect) =>
        dispatch(userWordsActions.onUpdateUserWordStatistics(wordId, isCorrect, 'savanna')),
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
