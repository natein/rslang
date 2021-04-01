import * as React from 'react';

import { connect } from 'react-redux';

import LastReview from './LastReview';
import FormDialog from './FormDialog';
import LoadingPage from '../LoadingPage';

const ReviewPage = ({ loader }) => {
    return (
        <>
              {loader && <LoadingPage />}
              {!loader && <LastReview />}
            <FormDialog />
        </>
    );
}

const mapStateToProps = (state) => ({
    loader: state.common.loader,
});

export default connect(mapStateToProps)(ReviewPage);