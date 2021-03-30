import { TIMER, GET_SAVANNA_WORDS, GAME_WORDS_LOADED } from "../actions/gameActions";

import { getFour } from "../helpers/index";

const initialState = {
  wordsList: [],
  timer: false,
  savanna: {
    gamewords: [],
    answer: '',
  },
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GAME_WORDS_LOADED:
      return { ...state, wordsList: action.payload }

    case TIMER:
      return { ...state, timer: action.payload }

    case GET_SAVANNA_WORDS:
      const four = getFour(state.wordsList);
      const [answer] = four;
      return { ...state, savanna: { answer: answer.word, gamewords: four } }

    default:
      return state;
  }
}

export default gameReducer;
