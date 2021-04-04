import {
  Box,
  Button,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import Zoom from '@material-ui/core/Zoom';

import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import success from '../../assets/sounds/correct.mp3';
import failed from '../../assets/sounds/wrong.mp3';

import { GAMES } from '../../constants';

const styles = makeStyles(() => ({
  card: {
    backgroundColor: '#7986CBA1',
    padding: '1rem',
    minHeight: '40%',
    minWidth: '50%',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  topBox: {
    height: '210px',
    position: 'relative',
    width: '100%'
  },
  answers: {
    color: '#fff',
    margin: '10px',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '10px',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,.2)',
    }
  },
  answerNum: {
    marginRight: '5px',
    width: '10px',
    display: 'inline-block',
    position: 'relative'
  },
  answersBox: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '20px'
  },
  iconVolume: {
    height: '5em',
    width: '5em',
    color: '#ffffff',
    backgroundColor: 'rgba(255,255,255,.2)',
    borderRadius: '50%',
    padding: '1em',
    bottom: '0'
  },
  iconVolumeMini: {
    height: '1.5em',
    width: '1.5em',
    color: '#ffffff',
    backgroundColor: 'rgba(255,255,255,.2)',
    borderRadius: '50%',
    padding: '0.3em',
  },
  notKnow: {
    color: 'rgba(255,255,255,.6)',
    width: '200px',
    height: '50px',
    borderColor: 'rgba(255,255,255,.2)',
    fontSize: '12px',
    padding: '10px 40px',
    '&:hover': {
      borderColor: 'rgba(255,255,255,1)',
    }
  },
  next: {
    color: 'rgba(255,255,255,.6)',
    width: '200px',
    height: '50px',
    backgroundColor: 'rgba(255,255,255,.2)',
    border: 'none',
    fontSize: '12px',
    padding: '10px 40px',
    '&:hover': {
      color: 'rgba(255,255,255,1)',
      backgroundColor: 'rgba(255,255,255,.2)',
    }
  },
  wordAnswerSuccess: {
    cursor: 'default',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0) !important',
    }
  },
  wordAnswerWrong: {
    color: 'rgba(255,255,255,0.4)',
    textDecoration: 'line-through',
    cursor: 'default',
    '&:hover': {
      textDecoration: 'line-through',
      backgroundColor: 'rgba(255,255,255,0) !important',
    }
  },
  wordAnswerEmpty: {
    color: 'rgba(255,255,255,0.4)',
    cursor: 'default',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0) !important',
    }
  },
  wordAnswerEmptySuccess: {
    cursor: 'default',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0) !important',
    }
  },
  iconSuccess: {
    fontSize: '1em',
    color: '#66bb6a',
    position: 'absolute',
    left: '-7px',
    top: '-15px'
  },
  viewVolume: {
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transform: 'translate(-50%, 0)'
  },
  viewAnswer: {
    textAlign: 'center',
    fontSize: '28px',
  },
  viewAnswerImage: {
    display: 'block',
    margin: '0 auto 31px',
    width: '116px',
    height: '116px',
    borderRadius: '116px',
    border: '2px solid #fff',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%',
    backgroundColor: 'hsla(0,0%,100%,.05)'
  },
  viewAnswerWord: {
    position: 'relative',
    display: 'inline-block'
  },
  volumeMini: {
    position: 'absolute',
    left: '-60px',
    top: '-9px'
  },
  sound: {
    width: '23px',
    height: '24px',
    backgroundPosition: '0',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    left: 0,
    margin: '20px'
  },
  enableSound: {
    backgroundImage: `url(${GAMES.hud.sound})`,
  },
  disableSound: {
    backgroundImage: `url(${GAMES.hud.disableSound})`,
  }
}));

const baseUrl = process.env.REACT_APP_API || '';

const shuffleArray = (array) => {
  array.sort(() => Math.random() - 0.5);
}

const AudioCallGame = ({ words = [], statistics, onFinish, onAddWordToDictionary, setGameWords }) => {
  const classes = styles();
  const [current, setCurrent] = useState(0);
  const [list, setList] = useState();
  const [answer, setAnswer] = useState('');
  const [hint, setHint] = useState(false);
  const [sound, setSound] = useState(true);

  const currentWord = words[current];
  const currentAudio = new Audio(`${baseUrl}/${words[current].audio}`);

  const onNext = useCallback(() => {
    if (current === words.length - 1) {
      onFinish(true);
      return;
    }

    setCurrent(current + 1);
    setAnswer('');
    setHint(false);
  }, [words, onFinish, current]);

  const onWordPlay = () => {
    currentAudio.play();
  };

  const onAnswer = useCallback(
    (answerWord, hint = false) => {
      if (answer) return;
      const isAnswerCorrect = currentWord.id === answerWord.id && !hint;
      if (isAnswerCorrect) {
        sound && new Audio(success).play();
        statistics.current.words.push({ ...currentWord, correct: true });
      } else {
        sound && new Audio(failed).play();
        statistics.current.words.push({ ...currentWord, correct: false });
      }
      setAnswer(answerWord);
      setHint(hint);
      onAddWordToDictionary(currentWord.id, currentWord, isAnswerCorrect);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [current, answer]
  );

  const ViewAnswer = () => {
    return (
      <Zoom in={true}>
        <Box className={classes.viewAnswer}>
          <Box className={classes.viewAnswerImage} style={{ backgroundImage: `url(${baseUrl}/${currentWord.image})` }} />
          <Box className={classes.viewAnswerWord}>
            <IconButton className={classes.volumeMini} color="default" component="span" onClick={onWordPlay}>
              <VolumeUpIcon className={classes.iconVolumeMini} />
            </IconButton>
            {currentWord.word}
          </Box>
        </Box>
      </Zoom >
    );
  };

  useEffect(() => {
    let answers = words.filter((_, idx) => idx !== current);
    shuffleArray(answers);
    answers = answers.slice(0, 4);
    answers.push(words[current]);
    shuffleArray(answers);
    setList(answers);
    currentAudio.play();

    return () => {
      setAnswer('');
      setHint(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  useEffect(() => {
    const keyHandler = (e) => {
      switch (e.code) {
        case 'Digit1':
          onAnswer(list[0]);
          break;
        case 'Digit2':
          onAnswer(list[1]);
          break;
        case 'Digit3':
          onAnswer(list[2]);
          break;
        case 'Digit4':
          onAnswer(list[3]);
          break;
        case 'Digit5':
          onAnswer(list[4]);
          break;
        case 'Space':
          onWordPlay();
          break;
        case 'Enter':
          !answer && onAnswer(currentWord, true);
          answer && onNext();
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', keyHandler);

    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onAnswer, list, onWordPlay, onNext]);


  return (
    <>
      <Box className={classes.content}>
        <Box className={classes.topBox}>
          {
            !answer &&
            <Box className={classes.viewVolume}>
              <IconButton color="default" component="span" onClick={onWordPlay}>
                <VolumeUpIcon className={classes.iconVolume} />
              </IconButton>
            </Box>
          }
          {answer && <ViewAnswer />}
        </Box>
        <Box className={classes.answersBox}>
          {list && list.map((word, idx) => (
            <Box
              key={idx}
              className={`
                  ${classes.answers} 
                  ${(word.id === answer.id && answer.id === currentWord.id) && classes.wordAnswerSuccess}
                  ${(word.id === answer.id && answer.id !== currentWord.id) && classes.wordAnswerWrong}
                  ${(word.id !== answer.id && currentWord.id !== word.id && answer) && classes.wordAnswerEmpty}
                  ${(word.id !== answer.id && currentWord.id === word.id && answer) && classes.wordAnswerEmptySuccess}
                `}
              component="div"
              onClick={() => onAnswer(word)}
            >
              <Box className={classes.answerNum} component="span">
                {(word.id === answer.id && answer.id === currentWord.id && !hint) ? <CheckCircleIcon className={classes.iconSuccess} /> : idx + 1}
              </Box>
              <Box className={classes.answerWord} component="span">{word.wordTranslate}</Box>
            </Box>
          ))}
        </Box>
        {!answer && <Button variant="outlined" className={classes.notKnow} onClick={() => onAnswer(currentWord, true)}>не знаю</Button>}
        {answer && <Button variant="outlined" className={classes.next} onClick={() => onNext()}><ArrowRightAltIcon /></Button>}

        <Box className={`${classes.sound} ${sound ? classes.enableSound : classes.disableSound}`} onClick={() => setSound(sound => !sound)}></Box>
      </Box>
    </>
  );
};

export default AudioCallGame;
