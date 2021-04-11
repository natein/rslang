import * as React from 'react';

import { connect } from 'react-redux';

import LastReview from './LastReview';
import FormDialog from './FormDialog';
import LoadingPage from '../LoadingPage';

import { loadReview } from '../../actions/reviewActions';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    reviewCont: {
        padding: '0 12em',
    },
}));

const ReviewPage = ({ loader, review, onLoadReview }) => {
    const classes = useStyles();

    React.useEffect(() => {
        onLoadReview();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.reviewCont}>
            {loader && <LoadingPage />}
            {!loader && (
                <>
                    <LastReview review={review} />
                    <FormDialog />
                </>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    loader: state.common.loader,
    review: state.common.review,
});

const mapDispatchToProps = (dispatch) => ({
    onLoadReview: () => dispatch(loadReview()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPage);
