import {
    Box,
    TextField,
    Button,
    CircularProgress,
    makeStyles,
    Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Crystal from '../Crystal';
import success from '../../assets/sounds/correct.mp3';
import failed from '../../assets/sounds/wrong.mp3';

const letterBoxSizeClasses = [
  { from: 0, to: 30, className: 'unknown'},
  { from: 31, to: 50, className: 'small'},
  { from: 51, to: 70, className: 'middle'},
  { from: 71, to: 100, className: 'large'},
  { from: 101, to: 1000000, className: 'huge'},
];

const styles = makeStyles((theme) => ({
    leaves: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '50px',
        marginBottom: '30px',
    },
    wordBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '30px',
    },
    wordLetterBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.5)',
        height: '100px',
    },
    huge: {
        width: '100px',
    },
    large: {
        width: '70px',
    },
    middle: {
        width: '50px',
    },
    small: {
        width: '30px',
    },
    unknown: {
        width: '0',
    },     
    wordLetter: {
        fontSize: '40px',
        fontWeight: 'black',
        color: '#000',
    },
    gameForm: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '30px',
    },
    inputWord: {
        width: '270px',
        height: '60px',
        backgroundColor: 'rgba(255,255,255,0.8)',
        fontSize: '24px',
    },
    btns: {
        height: '60px',
        padding: '0 25px',
        backgroundColor: 'green',
        color: '#fff',
        fontSize: '24px',
        fontWeight: 'bold',
    },
    nextWordStyle: {
      marginBottom: '70px',
    },
    wordLeaves: {
        color: '#fff',
        fontSize: '24px',
    },
    translate: {
      fontSize: '40px',
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: '50px',
    },
    result: {
      fontSize: '40px',
      fontWeight: 'bold',
      marginBottom: '30px',
    },
    resultCorrect: {
      color: 'green',
    },
    resultError: {
      color: 'red',
    },    
    invisible: {
      visibility: 'hidden',
    },
    timer: {
        position: 'relative',
    },
    remainingTime: {
        position: 'absolute',
        top: '47%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
    },    
}));

const ROUND_TIME = 30;

const OurGame = ({ 
    words = [],
    roundTime = ROUND_TIME,
    statistics,
    onFinish,
    onAddWordToDictionary
}) => {
    const classes = styles();
    
    const randomizedWords = [].concat(words)
        .sort((a,b) => Math.random() > 0.5);

    const nextBtn = useRef();
    const cont = useRef();
    const [timer, setTimer] = useState(roundTime);
    const timeout = useRef();
    const [currentIdx, incrementIdx] = useState(0);
    const [answer, setAnswer] = useState('');
    const [isAnswer, setAnswerState] = useState(false);
    const [isCorrect, changeResultState] = useState(false);

    const curWord = (currentIdx > randomizedWords.length - 1)
      ? randomizedWords[randomizedWords.length - 1]
      : randomizedWords[currentIdx];

    useEffect(() => {
        timeout.current = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => {
            clearInterval(timeout.current);
        };
    }, []);

    const onNextWord = useCallback(
        () => {
            incrementIdx(currentIdx + 1);
            setTimer(ROUND_TIME);
            setAnswerState(false);
        },
        [currentIdx],
    );    

    useEffect(() => {
        if (timer <= 0) {
            statistics.current.words.push({ ...curWord, correct: false });
            onNextWord();
        }
    }, [timer, onNextWord, curWord, statistics]);

    useEffect(() => {
        const leave = randomizedWords.length - currentIdx;
        if (leave === 0) {
            clearInterval(timeout.current);
            onFinish(true);
        }
    }, [currentIdx, onFinish, randomizedWords]);

    useEffect(() => {
        if(isAnswer) {
            const isCorrect = curWord.word.toLowerCase() === answer.toLowerCase();
            if(isCorrect) {
                changeResultState(true);
                new Audio(success).play();
                statistics.current.words.push({ ...curWord, correct: true });
                statistics.current.longestSeries += 1;
            } else {
                changeResultState(false);
                new Audio(failed).play();
                statistics.current.words.push({ ...curWord, correct: false });
                statistics.current.longestSeries = 0;
            }
            onAddWordToDictionary(curWord.id, curWord, isCorrect);
        }
        setAnswer('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAnswer, statistics, currentIdx, curWord]);

    const handleChangeAnswer = (evt) => {
        setAnswer(evt.target.value);
    };

    const onAnswer = (evt) => {
        evt.preventDefault();
        setAnswerState(true);
    };

    useEffect(() => {
        nextBtn.current.focus();
    }, [isAnswer]);

    const handleKeyDown = (evt) => {
        evt.preventDefault();
        const RETURN_CODE = 13;
        if (evt.keyCode === RETURN_CODE || evt.which === RETURN_CODE) {
            onNextWord();
        }
    };

    const wordsLeaves = randomizedWords.length - currentIdx;

    const letterStyle = (isAnswer)
        ? classes.wordLetter
        : `${classes.wordLetter} ${classes.invisible}`;

    const answerStyle = (isAnswer)
        ? classes.result
        : `${classes.result} ${classes.invisible}`;

    const resultStyle = (isCorrect) 
        ? `${answerStyle} ${classes.resultCorrect}`
        : `${answerStyle} ${classes.resultError}`;

    const inputStyle = (isAnswer) 
        ? `${classes.inputWord} ${classes.invisible}`
        : classes.inputWord;

    const enterStyle = (isAnswer)
        ? `${classes.btns} ${classes.invisible}`
        : classes.btns;

    const nextWordStyle = (isAnswer)
        ? classes.btns
        : `${classes.btns} ${classes.invisible}`;

    const result = (isCorrect) ? 'Правильно!' : 'Неправильно!';
      
    const containerWidth = (cont.current) 
      ? cont.current.parentNode.offsetWidth - 20 * (curWord.word.length - 1) : 0;
    const widthEnabled = Math.ceil(containerWidth / curWord.word.length);
    const sizeClass = letterBoxSizeClasses.filter(item => item.from <= widthEnabled 
        && item.to >= widthEnabled )[0].className;
    
    const letterWordClass = `${classes.wordLetterBox} ${classes[sizeClass]}`;

    const lettersBoxes = curWord.word.split('').map((item, idx) => {
        return (
        <Box className={letterWordClass} key={idx.toString()} >
            <Typography className={letterStyle} >{item.toUpperCase()}</Typography>
        </Box>
        )
    });
    
    return (
        <>
            <Box className={classes.leaves} >
                <Timer currentTime={timer} initialTime={roundTime} />
                <Typography className={classes.wordLeaves} >Осталось: {wordsLeaves} слов</Typography>
            </Box>
            <Typography className={classes.translate} >{curWord.wordTranslate}</Typography>
            <Box className={classes.wordBox} ref={cont}>
              { lettersBoxes }
            </Box>
            <Typography className={resultStyle}>{result}</Typography>
            <form className={classes.gameForm} noValidate autoComplete="off"
                onSubmit={onAnswer}
            >
                <TextField label="Введите слово" variant="filled"
                    className={inputStyle}
                    value={answer}
                    onChange={handleChangeAnswer}
                    inputRef={input => input && input.focus()}
                />
                <Button className={enterStyle} 
                    onClick={onAnswer}
                >Ввод</Button>
            </form>
            <Button className={nextWordStyle}
                ref={nextBtn}
                onClick={onNextWord}
                onKeyDown={handleKeyDown}
            >Следующее слово</Button>
            <Crystal />
        </>
    );
};

const Timer = ({ currentTime, initialTime }) => {
    const classes = styles();
    return (
        <Box position="relative" className={classes.timer}>
            <CircularProgress variant="determinate" value={(currentTime * 100) / initialTime} color="secondary" />
            <Typography component="h6" variant="h6" className={classes.remainingTime}>
                {currentTime}
            </Typography>
        </Box>
    );
};

export default OurGame;
