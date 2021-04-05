import { GET_SAVANNA_WORDS, GAME_WORDS_LOADED, LOST_LIFE, INIT_LIFE } from "../actions/gameActions";
import { GAMES } from '../constants/index'
import { getFour, shuffle } from "../helpers/index";

const initialState = {
  wordsList: [],
  savanna: {
    gamewords: [],
    answer: '',
    lifes: [0, 0, 0, 0]
  },
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GAME_WORDS_LOADED:
      return { ...state, wordsList: action.payload }

    case GET_SAVANNA_WORDS:
      const words = action.payload || state.wordsList
      const fourWord = getFour(words);
      const answer = fourWord[shuffle(4)];
      return { ...state, savanna: { ...state.savanna, answer: answer.word, gamewords: fourWord } }

    case INIT_LIFE:
      return { ...state, savanna: { ...state.savanna, lifes: [0, 0, 0, 0] } }

    case LOST_LIFE:
      if (action.payload < GAMES.lifes) {
        state.savanna.lifes[action.payload] = 1;
      }
      return { ...state, savanna: { ...state.savanna, lifes: [...state.savanna.lifes] } }

    default:
      return state;
  }
}

export default gameReducer;
