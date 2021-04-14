import React from 'react';
import Grid from '@material-ui/core/Grid';
import { fade, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import githubIcon from "../../assets/github.svg";

const github = "https://github.com/";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 350,
        margin: '0 auto',
        // padding: '2px 0px 2px 0px',
        '&:hover': {
            boxShadow: `0 5px 8px 0 ${fade(theme.palette.common.black, 0.4)},
                        0 5px 8px 0 ${fade(theme.palette.common.black, 0.4)}`,
            '& *': {
                color: theme.palette.common.black,
            },
        },
    },
    caption: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    card: {
        padding: '10px 0px 10px 0px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    actionArea: {
        display: 'flex',
        justifyContent: 'center',    
    },
    githubLink: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5px',
    },
    githubIcon: {
        width: '25px',
        height: '25px',
        marginRight: '10px',
    },
    list: {
        margin: 'auto',
    },
    listItems: {
        marginBottom: '-15px',
    },
}));

function AboutTeam({ team }) {
    const classes = useStyles();
    
    return (
        <>
            <Typography className={classes.caption} gutterBottom variant="h4" component="h6">
                {'О команде'}
            </Typography>
            <Grid container spacing={4}>
                {team.map((dev) => (
                    <Grid item xs={12} sm={12} md={6} lg={4} key={dev.github} >
                        <Card className={`${classes.root} developer`}>                            
                            <CardMedia
                                component="img"
                                alt={dev.name}
                                height="300"
                                image={dev.photo}
                                title={dev.name}
                            />
                            <CardContent className={classes.card}>
                                <Typography gutterBottom variant="h6" component="h3">
                                    {dev.name}
                                </Typography>
                                <CardActionArea className={classes.actionArea}>
                                    <Link className={classes.githubLink} target="_blank" rel="noreferrer"
                                        href={github + dev.github}
                                        variant="body2">
                                        <img className={classes.githubIcon} src={githubIcon} alt='' />
                                        {dev.github}
                                    </Link>
                                </CardActionArea>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {dev.role}
                                </Typography>
                                <List className={classes.list} aria-label="completed tasks">
                                  {dev.tasks.map((item,idx) => (
                                     <ListItem key={idx.toString()}>
                                        <ListItemText className={classes.listItems} primary={idx + 1  + '. ' + item } />
                                    </ListItem>
                                  ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default AboutTeam;
