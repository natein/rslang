import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChooseWords from './ChooseWords';
import { setLostLife } from '../../../../../actions/gameActions';

function ChooseWordsContainer({
    onFinish = (f) => f,
    setLostLife = (f) => f,
    sound,
    gamewords,
    statistics,
}) {
    return (
        <>
            <ChooseWords
                sound={sound}
                onFinish={onFinish}
                setLostLife={setLostLife}
                gamewords={gamewords}
                statistics={statistics}
            />
        </>
    );
}

ChooseWordsContainer.propTypes = {
    onFinish: PropTypes.func,
    setLostLife: PropTypes.func,
    sound: PropTypes.bool,
    gamewords: PropTypes.array,
    statistics: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        gamewords: state.game.savanna.gamewords,
    };
};

const mapDispatchToProps = (dispatch) => ({
    setLostLife: (id) => dispatch(setLostLife(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseWordsContainer);
