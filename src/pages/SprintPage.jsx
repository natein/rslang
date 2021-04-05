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
import * as userWordsActions from '../actions/ebookActions';
import { GAMES } from '../constants';

const sprintGame = GAMES.list.find((game) => game.code === 'sprint').backgroundImage;

const styles = makeStyles((theme) => ({
    fullscreen: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: common.white,
        margin: 0,
        padding: 0,
        minWidth: 'auto',
    },
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${sprintGame})`,
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

const SprintPage = ({
    words = [],
    loader,
    onLoadWords,
    userId,
    token,
    onCreateUserWord,
    setGameWords,
    onUpdateUserWordStatistics,
}) => {
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

    const onFullScreen = () => {
        if (!!document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            gameRef.current.requestFullscreen();
        }
    };

    const onNewGame = () => {
        onFinish(false);
        statistics.current = { score: 0, words: [] };
    };

    useEffect(() => {
        if (match) {
            setGameWords([]);
            onFinish(false);
            history.push('/games/sprint');
        }
    }, [match, setGameWords, history]);

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
            <Button className={classes.fullscreen} onClick={onFullScreen}>
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
    setGameWords: (words) => dispatch(gameActions.onWordsLoaded(words)),
    onCreateUserWord: (wordId, isCorrect) =>
        dispatch(userWordsActions.createUserWordWithStatistics(wordId, isCorrect, 'sprint')),
    onUpdateUserWordStatistics: (wordId, isCorrect) => dispatch(userWordsActions.onUpdateUserWordStatistics(wordId, isCorrect, 'sprint')),
});

export default connect(mapStateToProps, mapDispatchToProps)(SprintPage);
