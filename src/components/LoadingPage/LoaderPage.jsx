import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});

const LoaderPage = () => {
    const classes = useStyles();
    return (
        <Grid container spacing={4} className={classes.root}>
            <CircularProgress size='5rem'/>
        </Grid>
    );
};

export default LoaderPage;
