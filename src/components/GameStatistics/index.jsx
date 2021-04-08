import { Box, Divider, makeStyles, Typography, IconButton } from '@material-ui/core';
import React, { useCallback, useRef } from 'react';

import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { Link } from 'react-router-dom';

const styles = makeStyles((theme) => ({
    word: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: '0.5rem',
    },
    table: {
        width: '100%',
        maxWidth: '784px',
        margin: '0 auto 1rem',
        borderRadius: '10px',
        border: '1px solid grey',
        backgroundColor: '#fff',
        overflow: 'auto',
        padding: '30px 50px',
        [theme.breakpoints.down('sm')]: {
            padding: '20px 30px',
        },
    },
    title: {
        color: 'white',
        textAlign: 'center',
    },
    description: {
        color: 'white',
        textAlign: 'start',
        margin: '1rem 0 0 1rem',
    },
    newGame: {
        flexShrink: 2,
        margin: '0 auto',
    },
    divider: {
        margin: '2rem',
    },

    red: {
        color: '#ed593b',
        marginLeft: '0.5rem',
        textTransform: 'uppercase',
    },
    green: {
        color: '#28c38a',
        marginLeft: '0.5rem',
        textTransform: 'uppercase',
    },
    wordText: {
        color: '#2582e7',
        fontWeight: 'bold',
    },
    wordTranslate: {
        color: '#37383c',
    },
    resultText: {
        color: '#37383c',
        textAlign: 'center',
        marginBottom: '40px',
        fontSize: '34px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '24px',
        },
    },
    linkGame: {
        cursor: 'pointer',
        marginTop: '20px',
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: 'rgba(37,130,231,.3)',
        padding: '10px 20px',
        margin: '10px',
        '&:hover': {
            backgroundColor: 'rgba(37,130,231,.5)',
        },
        textDecoration: 'none',
    },
    linkGameBox: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
}));

const GameStatistics = ({ statistics, onNewGame }) => {
    const baseUrl = process.env.REACT_APP_API || '';
    const classes = styles();

    const audio = useRef();

    const onAudioPlay = useCallback((audioPath) => {
        audio.current?.pause();
        audio.current = new Audio(`${baseUrl}/${audioPath}`);
        audio.current.play();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const correctWords = statistics.current.words.filter((word) => word.correct);
    const wrongtWords = statistics.current.words.filter((word) => !word.correct);
    const correctPerWrong = (correctWords.length / wrongtWords.length) * 100;

    return (
        <>
            <Box component="div" className={classes.table}>
                <Typography className={classes.resultText} component="h2" variant="h5">
                    {correctPerWrong < 50 && 'В этот раз не получилось, но продолжай тренироваться!'}
                    {correctPerWrong > 50 && correctPerWrong < 90 && 'Неплохо, но есть над чем поработать'}
                    {correctPerWrong > 90 && 'Поздравляем, отличный результат!'}
                </Typography>
                <Typography className={classes.description} component="h2" variant="h5">
                    <Typography className={classes.green} component="span">
                        Знаю: {statistics.current.words.filter((word) => word.correct).length}
                    </Typography>
                </Typography>
                {statistics.current.words
                    .filter((word) => word.correct)
                    .map((word) => (
                        <Box className={classes.row} key={word.id}>
                            <Word word={word} onAudioPlay={onAudioPlay} />
                        </Box>
                    ))}
                <Divider variant="middle" className={classes.divider} />
                <Typography className={classes.description} component="h3" variant="h5" gutterBottom>
                    <Typography component="span" className={classes.red}>
                        Ошибок: {statistics.current.words.filter((word) => !word.correct).length}
                    </Typography>
                </Typography>
                {statistics.current.words
                    .filter((word) => !word.correct)
                    .map((word) => (
                        <Box className={classes.row} key={word.id}>
                            <Word word={word} onAudioPlay={onAudioPlay} />
                        </Box>
                    ))}
            </Box>
            <Box className={classes.linkGameBox}>
                <span className={classes.linkGame} onClick={onNewGame}>
                    Играть еще
                </span>
                <Link to="/games" className={classes.linkGame}>
                    К списку игр
                </Link>
            </Box>
        </>
    );
};

const Word = ({ word, onAudioPlay }) => {
    const classes = styles();

    return (
        <Box component="div" className={classes.word}>
            <IconButton color="default" onClick={() => onAudioPlay(word.audio)}>
                <VolumeUpIcon />
            </IconButton>
            <Box component="div" className={classes.wordInfo1}>
                <Box component="span" className={classes.wordText}>
                    {word.word}
                </Box>
                <Box component="span" className={classes.wordTranslate}>
                    {' '}
                    —{' '}
                </Box>
                <Box component="span" className={classes.wordTranslate}>
                    {word.wordTranslate}
                </Box>
            </Box>
        </Box>
    );
};

export default GameStatistics;
