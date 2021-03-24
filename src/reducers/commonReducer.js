const initialState = {
    user: null,
    error: null,
    loader: false,
  };

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ERROR': {
            return { ...state, loader: false, error: action.payload };
        }
        case 'USER': {
            return { ...state, error: null, user: action.payload };
        }
        case 'USER_LOGOUT': {
            return { ...state, user: null };
        }
        default: {
            return state;
        }
    }
};

export default commonReducer;