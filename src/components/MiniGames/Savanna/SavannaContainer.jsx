import { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import Savanna from './Savanna';
import { openCrossModal } from '../../../actions/gamesActions';
import styled, { StyleSheetManager } from 'styled-components';
import PropTypes from 'prop-types';
import { loadWords, gameInit, startTimer } from '../../../actions/gamesActions';

function SavannaContainer({ crossModalOpen, loadWords, gameInit, startGame, timer }) {
    useEffect(() => {
        gameInit();
        loadWords();
    });

    return (
        <>
            <Savanna startGame={startGame} timer={timer} crossModalOpen={crossModalOpen} />
        </>
    );
}

Savanna.propTypes = {
    crossModalOpen: PropTypes.func.isRequired,
    loadWords: PropTypes.func,
    timer: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        timer: state.games.timer,
    };
};

const mapDispatchToProps = (dispatch) => ({
    crossModalOpen: () => dispatch(openCrossModal()),
    loadWords: (group, page) => dispatch(loadWords(group, page)),
    gameInit: () => dispatch(gameInit()),
    startGame: () => dispatch(startTimer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavannaContainer);
