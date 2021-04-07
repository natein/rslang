import { Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import Statistics from '../components/Statistics/Statistics';

const StatisticsPage = ({ userId }) => (
    <>
        {!!userId && <Statistics />}
        {!userId && (
            <>
                <Typography variant="h4" component="h1">
                    Статистика
                </Typography>
                <Typography component="p">
                    Только авторизированные пользователи могут просматривать статистику!
                </Typography>
            </>
        )}
    </>
);

const mapStateToProps = (state) => ({
    userId: state.user.userId,
});

export default connect(mapStateToProps)(StatisticsPage);
