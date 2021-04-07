import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChooseWords from './ChooseWords';
import { setLostLife } from '../../../../../actions/gameActions';

function ChooseWordsContainer({
    onFinish = (f) => f,
    setLostLife = (f) => f,
    onAddWordToDictionary = (f) => f,
    sound,
    gamewords,
    statistics,
    match,
    wordsList,
}) {
    return (
        <>
            <ChooseWords
                sound={sound}
                onFinish={onFinish}
                setLostLife={setLostLife}
                gamewords={gamewords}
                wordsList={wordsList}
                statistics={statistics}
                onAddWordToDictionary={onAddWordToDictionary}
                match={match}
            />
        </>
    );
}

ChooseWordsContainer.propTypes = {
    onFinish: PropTypes.func.isRequired,
    setLostLife: PropTypes.func.isRequired,
    onAddWordToDictionary: PropTypes.func.isRequired,
    sound: PropTypes.bool,
    gamewords: PropTypes.array,
    statistics: PropTypes.object,
    match: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        gamewords: state.game.savanna.gamewords,
        wordsList: state.game.wordsList,
    };
};

const mapDispatchToProps = (dispatch) => ({
    setLostLife: (id) => dispatch(setLostLife(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseWordsContainer);
