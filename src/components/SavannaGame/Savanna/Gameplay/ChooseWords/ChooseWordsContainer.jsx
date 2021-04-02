import { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChooseWords from './ChooseWords';
import { getSavannaWords, setLostLife } from '../../../../../actions/gameActions';

function ChooseWordsContainer({
    sound,
    gamewords,
    answer,
    difficultyLvl,
    setLostLife = (f) => f,
    getSavannaWords = (f) => f,
}) {
    useEffect(() => {});

    return (
        <>
            <ChooseWords
                sound={sound}
                difficultyLvl={difficultyLvl}
                getSavannaWords={getSavannaWords}
                setLostLife={setLostLife}
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
    setLostLife: (id) => dispatch(setLostLife(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseWordsContainer);
