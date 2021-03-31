import { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChooseWords from './ChooseWords';
import { getSavannaWords } from '../../../../../actions/gameActions';

function ChooseWordsContainer({ gamewords, answer, difficultyLvl, getSavannaWords = (f) => f }) {
    useEffect(() => {});

    return (
        <>
            <ChooseWords
                difficultyLvl={difficultyLvl}
                getSavannaWords={getSavannaWords}
                gamewords={gamewords}
                answer={answer}
            />
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

const mapDispatchToProps = (dispatch) => ({
    getSavannaWords: (group, page) => dispatch(getSavannaWords(group, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseWordsContainer);
