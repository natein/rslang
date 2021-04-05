import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChooseWords from './ChooseWords';
import { getSavannaWords, setLostLife } from '../../../../../actions/gameActions';

function ChooseWordsContainer({
    onFinish = (f) => f,
    sound,
    gamewords,
    answer,
    difficultyLvl,
    setLostLife = (f) => f,
    loadSavannaWords = (f) => f,
    statistics,
}) {
    return (
        <>
            <ChooseWords
                loadSavannaWords={loadSavannaWords}
                sound={sound}
                onFinish={onFinish}
                difficultyLvl={difficultyLvl}
                setLostLife={setLostLife}
                gamewords={gamewords}
                answer={answer}
                statistics={statistics}
            />
        </>
    );
}

ChooseWordsContainer.propTypes = {
    loadSavannaWords: PropTypes.func,
    sound: PropTypes.bool,
    onFinish: PropTypes.func,
    difficultyLvl: PropTypes.number,
    setLostLife: PropTypes.func,
    gamewords: PropTypes.array,
    answer: PropTypes.string,
    statistics: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        gamewords: state.game.savanna.gamewords,
        answer: state.game.savanna.answer,
    };
};

const mapDispatchToProps = (dispatch) => ({
    setLostLife: (id) => dispatch(setLostLife(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseWordsContainer);
