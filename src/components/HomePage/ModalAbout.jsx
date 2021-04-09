import React from 'react';

import Button from './Button';

import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import CardsAbout from './ModalAboutCard';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles(() => ({
    button: {
        color: 'dimgray',
        minWidth: 180,
        fontWeight: 900,
        margin: '0.4rem',
        boxShadow: '0px 2px 0px dimgray',
        border: '1px double dimgray',
        borderRadius: '10px 10px 10px 10px',
        fontFamily: 'Gilroy, Arial, sans-serif',
        '&:focus': {
            boxShadow: '0px 2px 0px darkslategray',
        },
        '&:hover': {
            color: 'black',
            border: '1px double darkslategray',
            boxShadow: '0 3px 3px darkslategray',
        },
    },
    contAbout: {
        display: 'flex',
        maxWidth: '700px',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        textAlign: 'center',
        fontWeight: 700,
    },
}));

export default function ModalInfo() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <>
            <h2 id="transition-modal-title">Как всё устроенно</h2>
            <p id="transition-modal-description" className={classes.info}>
                Приложение для изучения иностранных слов с техникой интервального повторения, отслеживания
                индивидуального прогресса и мини-игр.
            </p>
            <div className={classes.contAbout}>
                <CardsAbout />
            </div>

            <Button
                color="primary"
                variant="outlined"
                size="small"
                className={classes.button}
                component="a"
                onClick={() => history.push('/about')}
            >
                <CardActionArea />
                Разработчики
            </Button>
            <Button
                color="primary"
                variant="outlined"
                size="small"
                className={classes.button}
                component="a"
                onClick={() => console.log('!')}
            >
                Видео
            </Button>
        </>
    );
}
