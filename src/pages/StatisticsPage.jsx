import { Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import Statistics from '../components/Statistics/Statistics';
import LoadingPage from '../components/LoadingPage';

const StatisticsPage = ({ userId, loader }) => (
    <>
        {loader && <LoadingPage />}
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
    loader: state.ebook.loader
});

export default connect(mapStateToProps)(StatisticsPage);
