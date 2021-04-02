export const onError = (payload) => ({ type: 'ERROR', payload: payload });

export const onLocaleChange = (payload) => ({ type: 'LOCALE', payload: payload });

export const onSetReview = (payload) => ({ type: 'SET_REVIEW', payload: [payload] });

export const onLoaderReview = (payload) => ({ type: 'SET_LOADER_REVIEW', payload: payload });