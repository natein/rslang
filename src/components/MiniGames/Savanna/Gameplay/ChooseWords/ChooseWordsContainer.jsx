import { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import styled, { StyleSheetManager } from 'styled-components';
import PropTypes from 'prop-types';
// import { loadWords, gameInit, startTimer } from '../../../../../actions/gamesActions';
import ChooseWords from './ChooseWords';

function ChooseWordsContainer({ gamewords, answer }) {
    useEffect(() => {});

    return (
        <>
            <ChooseWords gamewords={gamewords} answer={answer} />
        </>
    );
}

ChooseWordsContainer.propTypes = {
    gamewords: PropTypes.array,
    answer: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        gamewords: state.games.gamewords,
        answer: state.games.answer,
    };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseWordsContainer);
