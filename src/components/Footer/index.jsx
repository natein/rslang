import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import img from '../../assets/rs_school_1.svg';
import { DEVELOPERS } from '../../constants';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: '#ebebeb',
        color: 'grey',
        padding: '10px',
    },
    footerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    date: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        },
    },
    gitHubLink: {
        color: 'grey',
        textDecoration: 'none',
        cursor: 'pointer',
    },
    gitHubList: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '20px',
            marginBottom: '20px',
        },
    },
    logo: {
        width: '70px',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
        },
    },
    logoPick: {
        width: '70px',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
        },
        border: '2px solid black',
        backgroundColor: 'black',
        boxShadow: '0 0 14px rgb(128 128 128)',
    },
}));

const DeveloperElement = ({ className, github, fullname }) => (
    <a className={className} target="_blank" rel="noreferrer" href={github}>
        {fullname}
    </a>
);

function Footer() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container maxWidth="lg" className={classes.footerContainer}>
                <Grid container>
                    <Grid item xs={12} md={2} className={classes.logo}>
                        <a target="_blank" rel="noreferrer" href="https://rs.school/react/">
                            <img className={classes.logoPick} src={img} alt="RSS" />
                        </a>
                    </Grid>
                    <Grid item xs={12} md={8} className={classes.gitHubList}>
                        {DEVELOPERS.map((developer, i) => (
                            <DeveloperElement
                                key={i.toString()}
                                className={classes.gitHubLink}
                                fullname={developer.fullname}
                                github={developer.github}
                            />
                        ))}
                    </Grid>
                    <Grid item xs={12} md={2} className={classes.date}>
                        {new Date().getFullYear()}
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
}

export default Footer;
