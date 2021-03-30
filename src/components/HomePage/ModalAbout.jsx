import React from 'react';

import Button from './Button';

import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles(() => ({
    button: {
        minWidth: 150,
        margin: '1rem',
        border: '1px double rgb(113, 129, 255)',
        borderRadius: '15px 15px 15px 15px',
        '&:hover': {
            color: 'tomato',
            border: '1px double tomato',
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
