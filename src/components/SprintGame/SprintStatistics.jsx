import { Box, Button, Divider, makeStyles, Typography } from '@material-ui/core';
import React, { useCallback, useRef } from 'react';

import levelSelect from '../../assets/levelSelect.svg';

import VolumeUpIcon from '@material-ui/icons/VolumeUp';

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
        alignItems: 'stretch',
        color: theme.palette.primary.light,
        flexBasis: 1,
        padding: theme.spacing(5),
    },
    word: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        '& button': {
            color: '#0e2394',
        },
    },
    table: {
        width: '80%',
        margin: '0 auto 1rem',
        borderRadius: '10px',
        border: '1px solid grey',
        backgroundColor: '#7986CBA1',
        overflow: 'auto',
    },
    row: {
        padding: '0.5rem 0',
        '& p': {
            fontSize: '1.6rem',
            color: 'white',
        },
        '&:hover': {
            backgroundColor: '#7d7d7d36',
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
    wordInfo: {
        flexGrow: 1,
        '& p': {
            display: 'inline-block',
            width: '30%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'center',
        },
    },
    newGame: {
        flexShrink: 2,
        margin: '0 auto',
    },
    divider: {
        margin: '2rem',
    },

    red: {
        borderRadius: '40%',
        padding: '0.5rem',
        backgroundColor: 'red',
        color: 'white',
        marginLeft: '0.5rem'
    },
    green: {
        borderRadius: '40%',
        padding: '0.5rem',
        backgroundColor: 'green',
        color: 'white',
        marginLeft: '0.5rem'
    }
}));

const SprintStatistics = ({ statistics, onNewGame }) => {
    const baseUrl = process.env.REACT_APP_API || '';
    const classes = styles();

    const audio = useRef();

    const onAudioPlay = useCallback((audioPath) => {
        audio.current?.pause();
        audio.current = new Audio(`${baseUrl}/${audioPath}`);
        audio.current.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box component="section" className={classes.root}>
            <Typography className={classes.title} component="h1" variant="h4" gutterBottom>
                Результат: {statistics.current.score}
            </Typography>
            <Box component="div" className={classes.table}>
                <Typography className={classes.description} component="h2" variant="h5">
                    Правильно:
                    <Typography className={classes.green} component="span">
                        {statistics.current.words.filter((word) => word.correct).length}
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
                    Ошибся:
                    <Typography component="span" className={classes.red}>
                        {statistics.current.words.filter((word) => !word.correct).length}
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
            <Button color="primary" variant="contained" className={classes.newGame} onClick={onNewGame}>
                Играть еще
            </Button>
        </Box>
    );
};

const Word = ({ word, onAudioPlay }) => {
    const classes = styles();

    return (
        <Box component="div" className={classes.word}>
            <Button onClick={() => onAudioPlay(word.audioMeaning)}>
                <VolumeUpIcon />
            </Button>
            <Box component="div" className={classes.wordInfo}>
                <Typography className={classes.wordText}>{word.word}</Typography>
                <Typography className={classes.wordText}>{word.transcription}</Typography>
                <Typography className={classes.wordText}>{word.wordTranslate}</Typography>
            </Box>
        </Box>
    );
};

export default SprintStatistics;
