import { GET_SAVANNA_WORDS, GAME_WORDS_LOADED, LOST_SAVANNA_LIFE, INIT_SAVANNA_LIFE } from "../actions/gameActions";
import { GAMES } from '../constants/index'

const initialState = {
  wordsList: [],
  savanna: {
    gamewords: [],
    lifes: [0, 0, 0, 0]
  },
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GAME_WORDS_LOADED:
      return { ...state, wordsList: action.payload }

    case GET_SAVANNA_WORDS:
      const words = action.payload
      return { ...state, savanna: { ...state.savanna, gamewords: words } }

    case INIT_SAVANNA_LIFE:
      return { ...state, savanna: { ...state.savanna, lifes: [0, 0, 0, 0] } }

    case LOST_SAVANNA_LIFE:
      if (action.payload < GAMES.lifes) {
        state.savanna.lifes[action.payload] = 1;
      }
      return { ...state, savanna: { ...state.savanna, lifes: [...state.savanna.lifes] } }

    default:
      return state;
  }
}

export default gameReducer;
