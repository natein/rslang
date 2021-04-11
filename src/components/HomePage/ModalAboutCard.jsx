import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import infoTime from '../../assets/about/infoTime.png';
import infoStat from '../../assets/about/infoStat.png';
import infoMind from '../../assets/about/infoMind.png';
import infoGame from '../../assets/about/InfoGame.png';
import infoCont from '../../assets/about/infoCont.png';


const useStyles = makeStyles({
    root: {
        width: 190,
        height: 'auto',
        margin: '0.5rem',
        borderRadius: '8px',
        textAlign: 'center',
    },
    cardMedia: {
        height: '100%',
    },
    cardCont: {
        padding: 5,
    },
});

const data = [
    {
        title: 'Игры',
        descr: 'Разные игры помогают учить без скуки с результатом',
        img: infoGame,
    },
    {
        title: 'Статистика',
        descr: 'Правильно оценивай свой уровень знаний по статистике',
        img: infoStat,
    },
    {
        title: 'Знания',
        descr: 'Отмечай выученное, получай только новые знания',
        img: infoMind,
    },
    {
        title: 'Настройки',
        descr: 'Сложность меняется в зависимости от установок',
        img: infoCont,
    },
    {
        title: 'Повтор',
        descr: 'Уникальная система интервального повторения',
        img: infoTime,
    },
];

export default function CardsAbout() {
    const classes = useStyles();

    return data.map((el, i) => {
        return (
            <Card className={classes.root} key={ data.length - i }>
                    <CardActionArea className={classes.cardCont}>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            src={el.img}
                            title="Contemplative Reptile"
                            className={classes.cardMedia}
                        />
                            <Typography gutterBottom variant="h5" component="h2">
                                {el.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {el.descr}
                            </Typography>
                    </CardActionArea>
            </Card>
        );
    });
}
