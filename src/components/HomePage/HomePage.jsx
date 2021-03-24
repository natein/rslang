import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from './Button';
import Typography from './Typography';
import ProductHeroLayout from './ProductHeroLayout';
import backgroundImage from '../../assets/main_bg.jpg';

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        // backgroundPosition: 'center',
        //     height: '100%',
        //     width: '100%',
        //     objectFit: 'cover',
        // objectPosition: 'bottom',
        // backgroundSize: 'cover',
    },
    button: {
        minWidth: 150,
        margin: '1rem',
    },
    h5: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(10),
        },
    },
    more: {
        marginTop: theme.spacing(2),
    },
    buttonCont: {
        padding: theme.spacing(2),
    },
}));

function HomePage() {
    const classes = useStyles();

    return (
        <ProductHeroLayout backgroundClassName={classes.background}>
            {/* Increase the network loading priority of the background image. */}
            <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
            <Typography color="inherit" align="center" variant="h2" marked="center">
                RSLang
            </Typography>
            <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
                Learn more english words fast and funy.
            </Typography>
            <div className={classes.buttonCont}>
                <Button
                    color="secondary"
                    variant="contained"
                    size="small"
                    className={classes.button}
                    component="a"
                // href="/premium-themes/onepirate/sign-up/"
                >
                    Register
                </Button>
                <Button
                    color="secondary"
                    variant="contained"
                    size="small"
                    className={classes.button}
                    component="a"
                // href="/premium-themes/onepirate/sign-up/"
                >
                    Learn More
                </Button>
            </div>
            <Typography variant="body2" color="inherit" className={classes.more}>
                Discover the experience
            </Typography>
        </ProductHeroLayout>
    );
}

export default HomePage;
