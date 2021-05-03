import { Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import Statistics from '../components/Statistics/Statistics';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    authText: {
        marginBottom: '10px'
    },
}));

const StatisticsPage = ({ userId }) => {

    const classes = useStyles();
    return (
        <>
            {!!userId && <Statistics />}
            {!userId && (
                <>
                    <Typography className={classes.authText} variant="h4" component="h1">
                        Статистика
                </Typography>
                    <Typography  component="p">
                        Только авторизированные пользователи могут просматривать статистику!
                </Typography>
                </>
            )}
        </>
    )
}

const mapStateToProps = (state) => ({
    userId: state.user.userId,
});

export default connect(mapStateToProps)(StatisticsPage);
