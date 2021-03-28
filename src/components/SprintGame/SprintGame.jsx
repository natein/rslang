import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    createMuiTheme,
    Divider,
    makeStyles,
    ThemeProvider,
    Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import levelSelect from '../../assets/levelSelect.svg';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ProgressBar from './ProgressBar';

import { green, common } from '@material-ui/core/colors';
import success from '../../assets/sounds/correct.mp3';
import failed from '../../assets/sounds/wrong.mp3';

const styles = makeStyles((theme) => ({
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
        color: common.white,
        flexBasis: 1,
    },
    card: {
        backgroundColor: '#7986CBA1',
        padding: '1rem',
        minHeight: '40%',
        minWidth: '50%',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        '& .MuiButton-containedPrimary': {
            color: common.white,
        },
    },
    divider: {
        backgroundColor: '#ffffff8c',
    },

    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexGrow: 1,
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
    button: {
        margin: theme.spacing(1),
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

const ROUND_TIME = 60;
const ANSWER_SCORE = 20;

const SprintGame = ({ words = [], roundTime = ROUND_TIME, answerScore = ANSWER_SCORE, statistics, onFinish }) => {
    const classes = styles();
    const [timer, setTimer] = useState(roundTime);
    const timeout = useRef();
    const [current, setCurrent] = useState();
    const [bonus, setBonus] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        timeout.current = setInterval(() => setTimer((prev) => prev - 1), 1000);

        return () => {
            clearInterval(timeout.current);
        };
    }, []);

    useEffect(() => {
        if (timer <= 0) {
            clearInterval(timeout.current);
            onFinish(true);
        }
    }, [timer, onFinish]);

    useEffect(() => {
        onNextWord();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onNextWord = useCallback(
        (index = 0) => {
            const random = Math.random();
            const isValid = Math.round(random);
            if (index === words.length) {
                onFinish(true);
                return;
            }
            if (isValid === 1) {
                const translation = words[index].wordTranslate;
                const word = words[index].word;
                setCurrent({ index, word, translation, answer: true, info: words[index] });
            } else {
                let randomTranslationIndex = Math.round(random * words.length);
                randomTranslationIndex = randomTranslationIndex === index ? 0 : randomTranslationIndex;
                const translation = words[randomTranslationIndex].wordTranslate;
                const word = words[index].word;
                setCurrent({ index, word, translation, answer: false, info: words[index] });
            }
        },
        [words, onFinish],
    );

    const onAnswer = useCallback(
        (answer) => {
            if (current.answer === answer) {
                new Audio(success).play();
                statistics.current.score += answerScore + bonus;
                statistics.current.words.push({ ...current.info, correct: true });
                setProgress(current => current + 1);
            } else {
                new Audio(failed).play();
                statistics.current.words.push({ ...current.info, correct: false });
                setProgress(0);
            }
            onNextWord(current.index + 1);
        },
        [current, onNextWord, answerScore, statistics, bonus],
    );

    useEffect(() => {
        const keyHandler = (e) => {
            if (e.which === 39) {
                onAnswer(false);
            } else if (e.which === 37) {
                onAnswer(true);
            }
        };
        window.addEventListener('keydown', keyHandler);

        return () => {
            window.removeEventListener('keydown', keyHandler);
        };
    }, [onAnswer]);

    useEffect(() => {
        if(progress > 3) {
            setBonus(current => current + answerScore);
            setProgress(0);
        }
    }, [progress, answerScore]);

    return (
        <Box component="section" className={classes.root}>
            <Typography component="h1" variant="h4" gutterBottom>
                Текущий результат {statistics.current.score}
            </Typography>

            <Card variant="outlined" className={classes.card}>
                <CardContent className={classes.content}>
                    <Timer currentTime={timer} initialTime={roundTime} />
                    <ProgressBar currentStep={progress} />
                    <Typography component="h2" variant="h3">
                        {current?.word}
                    </Typography>
                    <Typography component="h3" variant="h5">
                        {current?.translation}
                    </Typography>
                </CardContent>
                <Divider variant="middle" className={classes.divider} />
                <CardActions className={classes.buttons}>
                    <ThemeProvider theme={theme}>
                        <Button
                            id="true"
                            variant="contained"
                            color="primary"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => onAnswer(true)}
                        >
                            Верно
                        </Button>
                    </ThemeProvider>
                    <Button
                        id="false"
                        variant="contained"
                        color="secondary"
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => onAnswer(false)}
                        className={classes.button}
                    >
                        Неверно
                    </Button>
                </CardActions>
            </Card>
        </Box>
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

export default SprintGame;
