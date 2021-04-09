import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        width: 180,
        height: 180,
        margin: '0.5rem',
        borderRadius: '8px',
    },
});

const moka = [
    {
        title: 'Игры',
        descr: 'Разные игры помогают учить без скуки',
    },
    {
        title: 'Опыт',
        descr: 'Получай огромное количество нового опыта',
    },
    {
        title: 'Знания',
        descr: 'Знания - это сила в современном мире',
    },
    {
        title: 'Подход',
        descr: 'Сложность меняется в зависимости от желания',
    },
    {
        title: 'Повтор',
        descr: 'Уникальная система интервального повторения',
    },
];

export default function CardsAbout() {
    const classes = useStyles();

    return moka.map((el) => {
        return (
            <Card className={classes.root}>
                <Button>
                    <CardActionArea>
                        {/* <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        /> */}
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {el.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {el.descr}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Button>
            </Card>
        );
    });
}
