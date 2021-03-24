const initialState = {
};

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER': {
            return { ...state, ...action.payload };
        }
        case 'USER_LOGOUT': {
            return {};
        }
        default: {
            return state;
        }
    }
};

export default commonReducer;
