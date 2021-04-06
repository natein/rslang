const initialState = {
    error: null,
    review: [],
    loader: false,
};

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ERROR': {
            return { ...state, error: action.payload };
        }
        case 'SET_REVIEW': {
            return { ...state, review: action.payload };
        }
        case 'SET_LOADER_REVIEW':
            return { ...state, loader: action.payload }
        default: {
            return state;
        }
    }
};

export default commonReducer;
