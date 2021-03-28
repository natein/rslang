import { Card, CardActionArea, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { GAMES_LIST } from '../constants';

import gamesBackground from '../assets/games.svg';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundImage: `url(${gamesBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto',
    },
    game: {
        minWidth: '400px',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'stretch',
        margin: '1rem',
        backgroundColor: 'grey',
        borderRadius: '40px',
        boxShadow: '0px 5px 24px 25px rgba(34, 60, 80, 0.2)',
        '&:hover': {
            boxShadow: '0px 5px 24px 25px rgba(255, 99, 71, 0.5)',
        }
    },
    media: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    title: {
        color: 'white',
        position: 'relative',
        textAlign: 'center',
    },
});

const GamesPage = () => {
    const classes = useStyles();
    const history = useHistory();

    const onClick = (code) => {
        history.push(`/games/${code}`);
    };

    return (
        <Grid container className={classes.container}>
            {GAMES_LIST.map((game) => (
                <Card key={game.code} className={classes.game}>
                    <CardActionArea onClick={() => onClick(game.code)}>
                        <CardMedia image={game.backgroundImage} title={game.name} className={classes.media} />
                        <CardContent>
                            <Typography variant="h1" color="textSecondary" className={classes.title}>
                                {game.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </Grid>
    );
};

export default GamesPage;
