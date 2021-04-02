import * as React from 'react';

import { connect } from 'react-redux';

import LastReview from './LastReview';
import FormDialog from './FormDialog';
import LoadingPage from '../LoadingPage';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    reviewCont: {
        padding: '0 12em',
    },
}));

const ReviewPage = ({ loader }) => {
    const classes = useStyles();

    return (
        <div className={classes.reviewCont}>
            {loader && <LoadingPage />}
            {!loader && <LastReview />}
            <FormDialog />
        </div>
    );
};

const mapStateToProps = (state) => ({
    loader: state.common.loader,
});

export default connect(mapStateToProps)(ReviewPage);
