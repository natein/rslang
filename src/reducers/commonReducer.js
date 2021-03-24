const initialState = {
    error: null,
};

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ERROR': {
            return { ...state, error: action.payload };
        }
        default: {
            return state;
        }
    }
};

export default commonReducer;
