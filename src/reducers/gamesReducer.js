import { OPEN_CROSSMODAL, CLOSE_CROSSMODAL } from "../actions/gamesActions";

const initialState = {
    modal: false,
};

const gamesReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_CROSSMODAL:
            return { ...state, modal: true }

        case CLOSE_CROSSMODAL:
            return { ...state, modal: false }

        default:
            return state;
    }
}

export default gamesReducer;