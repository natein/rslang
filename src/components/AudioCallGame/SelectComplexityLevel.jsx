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
                Аудиовызов
            </Typography>
            <Typography className={classes.description} component="p">
                <strong>Мини-игра «Аудиовызов» - это тренировка, которая улучшает восприятие речи на слух.</strong>
                <br />
                После запуска игры вы услышите слово. Вам нужно выбрать из 5 вариантов правильный перевод. <br />
                <ol>
                    <li>Используйте мышь, чтобы выбрать</li>
                    <li>Используйте цифровые клавиши от 1 до 5 для выбора ответа</li>
                    <li>Используйте пробел для повтроного звучания слова</li>
                    <li>Используйте клавишу Enter для подсказки или для перехода к следующему слову</li>
                </ol>
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
                <Select
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                    label="Сложности"
                    className={classes.select}
                >
                    <MenuItem key={0} value={1}>
                        1
                    </MenuItem>
                    <MenuItem key={1} value={2}>
                        2
                    </MenuItem>
                    <MenuItem key={2} value={3}>
                        3
                    </MenuItem>
                    <MenuItem key={3} value={4}>
                        4
                    </MenuItem>
                    <MenuItem key={4} value={5}>
                        5
                    </MenuItem>
                    <MenuItem key={5} value={6}>
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
