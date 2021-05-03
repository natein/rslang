import React, { useState } from 'react';

import Button from './Button';

import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import CardsAbout from './ModalAboutCard';
import CardsVideo from './ModalAboutVideo';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles((theme) => ({
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
            boxShadow: '0px 2px 0px black',
        },
        '&:hover': {
            color: 'black',
            border: '1px double darkslategray',
            boxShadow: '0 3px 3px black',
        },
    },
    contAbout: {
        display: 'flex',
        maxWidth: 700,
        height: 400,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            overflow: 'auto',
        },
    },
    info: {
        textAlign: 'center',
        fontWeight: 700,
    },
}));

export default function ModalInfo() {
    const classes = useStyles();
    const history = useHistory();

    const [check, setCheck] = useState(true);

    return (
        <>
            <h2 id="transition-modal-title">Как всё устроенно</h2>
            <p id="transition-modal-description" className={classes.info}>
                Приложение для изучения иностранных слов с техникой интервального повторения, отслеживания
                индивидуального прогресса и мини-игр.
            </p>
            <div className={classes.contAbout}>
                {check ? <CardsAbout /> : <CardsVideo /> }
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
                onClick={() => setCheck(!check)}
            >
                {check ? 'Видео' : 'Инфо'}
            </Button>
        </>
    );
}
