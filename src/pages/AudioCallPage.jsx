import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import AudioCallGame from '../components/AudioCallGame';
import { Box, makeStyles } from '@material-ui/core';
import { common } from '@material-ui/core/colors';
import AudioCallStatistics from '../components/GameStatistics';
import SelectComplexityLevel from '../components/SelectGameComplexity';
import LoadingPage from '../components/LoadingPage';
import * as gameActions from '../actions/gameActions';
import { useHistory, useRouteMatch } from 'react-router';
import * as userWordsActions from '../actions/ebookActions';
import FullScreen from '../components/FullScreen';
import { GAMES } from '../constants';

const AudioGame = GAMES.list.find((game) => game.code === 'audio');

const styles = makeStyles((theme) => ({
    fullscreen: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: common.white,
        margin: '20px',
        padding: 0,
        minWidth: 'auto',
    },
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${AudioGame.backgroundImage})`,
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

const AudioCallPage = ({
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
    const [ready, onReady] = useState(false);
    const statistics = useRef({ words: [], longestSeries: 0});
    const gameRef = useRef();
    const history = useHistory();

    const match = useRouteMatch({
        path: '/games/audio/new',
        strict: true,
        sensitive: true,
    });

    const onNewGame = () => {
        setGameWords([]);
        onFinish(false);
        onReady(false);
        statistics.current = { words: [], longestSeries: 0 };
    };

    useEffect(() => {
        onReady(true);
        return () => {
            setGameWords([]);
            onReady(false);
        };
    }, [setGameWords]);

    useEffect(() => {
        if (match) {
            setGameWords([]);
            onFinish(false);
            history.replace('/games/audio');
        }
    }, [match, setGameWords, history]);

    const onAddWordToDictionary = (wordId, word, isCorrect, ) => {
        if (userId && token) {
            if (word.userWord) {
                onUpdateUserWordStatistics(wordId, isCorrect, statistics.current);
            } else {
                onCreateUserWord(wordId, isCorrect, statistics.current);
            }
        }
    };

    return (
        <Box component="section" ref={gameRef} className={classes.root}>
            {loader && <LoadingPage />}
            {!loader && words.length === 0 && <SelectComplexityLevel gameName="audio" onLoadWords={onLoadWords} />}
            {!loader && words.length > 0 && !finished && ready && (
                <AudioCallGame
                    words={words}
                    setGameWords={setGameWords}
                    statistics={statistics}
                    onFinish={onFinish}
                    onAddWordToDictionary={onAddWordToDictionary}
                />
            )}
            {!loader && !!finished && <AudioCallStatistics statistics={statistics} onNewGame={onNewGame} />}
            <FullScreen reference={gameRef} />
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
    onCreateUserWord: (wordId, isCorrect, currentGameStatistics) =>
        dispatch(userWordsActions.createUserWordWithStatistics(wordId, isCorrect, 'audio', currentGameStatistics)),
    onUpdateUserWordStatistics: (wordId, isCorrect, currentGameStatistics) =>
        dispatch(userWordsActions.onUpdateUserWordStatistics(wordId, isCorrect, 'audio', currentGameStatistics)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AudioCallPage);
