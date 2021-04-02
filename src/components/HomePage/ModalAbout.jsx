import React from 'react';

import Button from './Button';

import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles(() => ({
    button: {
        color: '#0D7E94',
        minWidth: 150,
        margin: '1rem',
        boxShadow: '0px 2px 0px #0D7E94',
        border: '1px double #0D7E94',
        borderRadius: '15px 15px 15px 15px',
        fontFamily: 'Segoe script, cursive',
        '&:focus': {
            boxShadow: '0px 2px 0px #0D7E94',
        },
        '&:hover': {
            color: '#0D7E94',
            border: '1px double #0D7E94',
            boxShadow: '0 5px 5px #0D7E94',
        },
    },
}));

export default function ModalInfo() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <>
            <h2 id="transition-modal-title">Информация о проекте</h2>
            <p id="transition-modal-description">Вся необходимая информация будет здесь.</p>
            <Button
                color="primary"
                variant="outlined"
                size="small"
                className={classes.button}
                component="a"
                onClick={() => history.push('/about')}
            >
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
