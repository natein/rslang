import React from 'react';

import Button from './Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    button: {
        color: 'black',
        minWidth: 150,
        margin: '1rem',
        border: '1px double rgb(113, 129, 255)',
        borderRadius: '15px 15px 15px 15px',
    },
}));

export default function ModalInfo() {
    const classes = useStyles();

    return (
        <>
            <h2 id="transition-modal-title">Информация о проекте</h2>
            <p id="transition-modal-description">Вся необходимая информация будет здесь.</p>
            <Button
                color="secondary"
                variant="outlined"
                size="small"
                className={classes.button}
                component="a"
                onClick={console.log('!')}
            >
                Разработчики
            </Button>
            <Button
                color="secondary"
                variant="outlined"
                size="small"
                className={classes.button}
                component="a"
                onClick={console.log('!')}
            >
                Видео
            </Button>
        </>
    );
}
