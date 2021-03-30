import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import SprintGame from '../components/SprintGame';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import { Box, Button, makeStyles } from '@material-ui/core';
import { common } from '@material-ui/core/colors';
import SprintStatistics from '../components/SprintGame/SprintStatistics';
import SelectComplexityLevel from '../components/SprintGame/SelectComplexityLevel';
import LoadingPage from '../components/LoadingPage';
import * as gameActions from '../actions/gameActions';
import { useHistory, useRouteMatch } from 'react-router';
import * as userWordsActions from '../actions/userWordsActions';
import levelSelect from '../assets/levelSelect.svg';
import { onFullScreen } from '../helpers';

const styles = makeStyles((theme) => ({
    fullscreen: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: common.white,
        margin: 0,
        padding: 0,
        minWidth: 'auto',
        marginRight: '30px',
        marginTop: '15px',
    },
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${levelSelect})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        flexBasis: 1,
        padding: theme.spacing(5),
    },
}));

const SprintPage = ({ words = [], loader, onLoadWords, userId, token, onCreateUserWord }) => {
    const classes = styles();
    const [finished, onFinish] = useState(false);
    const statistics = useRef({ score: 0, words: [] });
    const gameRef = useRef();
    const history = useHistory();

    const match = useRouteMatch({
        path: '/games/sprint/new',
        strict: true,
        sensitive: true,
    });

    const onNewGame = () => {
        onFinish(false);
        statistics.current = { score: 0, words: [] };
    };

    useEffect(() => {
        if (match) {
            onLoadWords([]);
            onFinish(false);
            history.push('/games/sprint');
        }
    }, [match, onLoadWords, history]);

    const onAddWordToDictionary = (wordId) => {
        if (userId && token) {
            onCreateUserWord(userId, token, wordId);
        }
    };

    return (
        <Box id="sprint-game-board" component="section" ref={gameRef} className={classes.root}>
            {loader && <LoadingPage />}
            {!loader && words.length === 0 && <SelectComplexityLevel onLoadWords={onLoadWords} />}
            {!loader && words.length > 0 && !finished && (
                <SprintGame
                    words={words}
                    statistics={statistics}
                    onFinish={onFinish}
                    onAddWordToDictionary={onAddWordToDictionary}
                />
            )}
            {!loader && !!finished && <SprintStatistics statistics={statistics} onNewGame={onNewGame} />}
            <Button className={classes.fullscreen} onClick={() => onFullScreen(gameRef)}>
                <FullscreenIcon fontSize="large" />
            </Button>
        </Box>
    );
};

const mapStateToProps = (state) => ({
    words: state.game.wordsList,
    loader: state.ebook.loader,
    userId: state.user.id,
    token: state.user.token,
});

const mapDispatchToProps = (dispatch) => ({
    onLoadWords: (group, page) => dispatch(gameActions.loadWords(group, page)),
    onCreateUserWord: (userId, token, wordId) => dispatch(userWordsActions.createUserWord(userId, wordId, {}, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SprintPage);
