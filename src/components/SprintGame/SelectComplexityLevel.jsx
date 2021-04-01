import { Button, FormControl, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import React, { useState } from 'react';

const styles = makeStyles((theme) => ({
    description: {
        marginBottom: '4rem',
    },
    button: {
        color: 'white',
        borderColor: 'white',
        padding: '1rem',
        marginLeft: '1rem',
        '&:hover': {
            border: '2px solid white',
        },
        boxSizing: 'border-box',
    },
    select: {
        color: 'white',
        borderColor: 'white',
        minWidth: '10rem',
        '& .MuiSelect-icon': {
            color: 'white',
        },
        '& fieldset': {
            borderColor: 'white',
            '&:hover': {
                borderColor: 'white',
            },
        },
    },
    formControl: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '80%',
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            border: '2px solid white',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '2px solid white',
        },
    },
}));

const SelectComplexityLevel = ({ onLoadWords }) => {
    const classes = styles();
    const [group, setGroup] = useState(3);

    return (
        <>
            <Typography className={classes.title} component="h1" variant="h4" gutterBottom>
                Спринт
            </Typography>
            <Typography className={classes.description} component="p">
                <strong>Мини-игра «Спринт» - это тренировка для повторения заученных слов из вашего словаря.</strong>
                <br />
                После запуска игры вы увидите слово и перевод. Вам нужно выбрать, правильно это или неправильно. <br />
                1. Используйте мышь, чтобы выбрать.
                <br />
                2. Используйте клавиши влево и вправо.
                <br />
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
                <Select
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                    label="Сложности"
                    className={classes.select}
                >
                    <MenuItem key={1} value={1}>
                        1
                    </MenuItem>
                    <MenuItem key={2} value={2}>
                        2
                    </MenuItem>
                    <MenuItem key={3} value={3}>
                        3
                    </MenuItem>
                    <MenuItem key={4} value={4}>
                        4
                    </MenuItem>
                    <MenuItem key={5} value={5}>
                        5
                    </MenuItem>
                    <MenuItem key={6} value={6}>
                        6
                    </MenuItem>
                </Select>
                <Button
                    color="primary"
                    variant="outlined"
                    className={classes.button}
                    onClick={() => onLoadWords(group, Math.round(Math.random() * 30))}
                >
                    Начать
                </Button>
            </FormControl>
        </>
    );
};

export default SelectComplexityLevel;
