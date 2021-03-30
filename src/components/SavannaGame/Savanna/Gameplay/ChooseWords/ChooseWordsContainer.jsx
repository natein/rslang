import { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChooseWords from './ChooseWords';

function ChooseWordsContainer({ gamewords, answer, drawer }) {
    useEffect(() => {});

    return (
        <>
            <ChooseWords gamewords={gamewords} drawer={drawer} answer={answer} />
        </>
    );
}

ChooseWordsContainer.propTypes = {
    gamewords: PropTypes.array,
    answer: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        gamewords: state.game.savanna.gamewords,
        answer: state.game.savanna.answer,
        drawer: state.game.savanna.drawer,
    };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseWordsContainer);
