import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import AudioCallGame from '../components/AudioCallGame';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import { Box, Button, makeStyles } from '@material-ui/core';
import { common } from '@material-ui/core/colors';
import AudioCallStatistics from '../components/AudioCallGame/AudioCallStatistics';
import SelectComplexityLevel from '../components/AudioCallGame/SelectComplexityLevel';
import LoadingPage from '../components/LoadingPage';
import * as gameActions from '../actions/gameActions';
import { useHistory, useRouteMatch } from 'react-router';
import * as userWordsActions from '../actions/ebookActions';

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
    background: 'linear-gradient(180deg,#7d5db0 0,#b06d9a 72%,#c584a4)',
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

const AudioCallPage = ({ words = [], loader, onLoadWords, userId, token, onCreateUserWord, setGameWords, onUpdateUserWordStatistics }) => {
  const classes = styles();
  const [finished, onFinish] = useState(false);
  const [ready, onReady] = useState(false);
  const statistics = useRef({ words: [] });
  const gameRef = useRef();
  const history = useHistory();

  const match = useRouteMatch({
    path: '/games/audio/new',
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
    setGameWords([]);
    onFinish(false);
    onReady(false);
    statistics.current = { words: [] };
  };

  useEffect(() => {
    onReady(true);
    return () => {
      setGameWords([]);
      onReady(false);
    }
  }, [setGameWords]);

  useEffect(() => {
    if (match) {
      setGameWords([]);
      onFinish(false);
      history.push('/games/audio');
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
    <Box component="section" ref={gameRef} className={classes.root}>
      {loader && <LoadingPage />}
      {!loader && words.length === 0 && <SelectComplexityLevel onLoadWords={onLoadWords} />}
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
    dispatch(userWordsActions.createUserWordWithStatistics(wordId, isCorrect, 'audio')),
  onUpdateUserWordStatistics: (wordId, isCorrect) => dispatch(userWordsActions.onUpdateUserWordStatistics(wordId, isCorrect, 'audio')),
});

export default connect(mapStateToProps, mapDispatchToProps)(AudioCallPage);