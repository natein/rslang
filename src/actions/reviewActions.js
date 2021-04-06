// import { onError } from './commonActions';
import * as reviewService from '../api/reviewService';

export const SET_LOADER = 'SET_LOADER';
export const SET_WORDS = 'SET_WORDS';
export const SET_REVIEW = 'SET_REVIEW';
export const SET_LOADER_REVIEW = 'SET_LOADER_REVIEW';

export const loadReview = () => async (dispatch) => {
    dispatch(onLoaderReview(true));
    return (
        reviewService
            .getReview()
            .then((data) => dispatch(onSetReview(data)))
            // .then(data => console.log(data))
            .finally(() => dispatch(onLoaderReview(false)))
    );
};

export const putReview = (dataReview) => {
    return reviewService.putReview(dataReview);
};

export const setLoader = (loader) => ({ type: SET_LOADER, payload: loader });

export const onSetReview = (payload) => ({ type: SET_REVIEW, payload: payload });

export const onLoaderReview = (payload) => ({ type: SET_LOADER_REVIEW, payload: payload });
