import { GAME_WORDS_LOADED } from "../actions/gameActions";

const initialState = {
  wordsList: []
};

const ebookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GAME_WORDS_LOADED:
      return { ...state, wordsList: action.payload }

    default:
      return state;
  }
}

export default ebookReducer;
