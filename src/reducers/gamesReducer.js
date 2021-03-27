import { OPEN_CROSSMODAL, CLOSE_CROSSMODAL, GAME_INIT, CHANGE_DIFFICULTY, TIMER, GETGAME_WORDS } from "../actions/gamesActions";
import { getFour } from "../helpers/index";

const initialState = {
    modal: false,
    words: [],
    timer: false,
    gamewords: [],
    answer: ''
};

const gamesReducer = (state = initialState, action) => {
    switch (action.type) {

        case GAME_INIT:
            return { ...state, modal: false }

        case CHANGE_DIFFICULTY:
            return { ...state, words: action.payload }

        case OPEN_CROSSMODAL:
            return { ...state, modal: true }

        case CLOSE_CROSSMODAL:
            return { ...state, modal: false }

        case TIMER:
            return { ...state, timer: action.payload }

        case GETGAME_WORDS:
            const four = getFour(state.words); 
            const [answer] = four;
            return { ...state, answer: answer.word, gamewords: four }

        default:
            return state;
    }
}

export default gamesReducer;