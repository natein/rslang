import { UPDATE_USER_STATISTICS, CLEAR_STATISTICS } from "../actions/statisticsActions";

const initialState = {};

const statisticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_STATISTICS: {
            return { ...state, ...action.payload };
        }
        case CLEAR_STATISTICS: {
            return {};
        }
        default: {
            return state;
        }
    }
};

export default statisticsReducer;
