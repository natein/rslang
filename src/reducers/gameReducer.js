import { TIMER, GET_SAVANNA_WORDS, GAME_WORDS_LOADED, LOST_LIFE, INIT_LIFE } from "../actions/gameActions";
import { GAMES } from '../constants/index'
import { getFour, shuffle } from "../helpers/index";

const initialState = {
  wordsList: [],
  timer: false,
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

    case TIMER:
      return { ...state, timer: action.payload }

    case GET_SAVANNA_WORDS:
      const four = getFour(state.wordsList);
      const answer = four[shuffle(4)];
      return { ...state, savanna: { answer: answer.word, gamewords: four, lifes: [...state.savanna.lifes] } }

    case INIT_LIFE:
      return { ...state, savanna: { answer: state.savanna.answer, gamewords: [...state.savanna.gamewords], lifes: [0, 0, 0, 0] } }
      
    case LOST_LIFE:
      if (action.payload < GAMES.lifes) {
        state.savanna.lifes[action.payload] = 1;
      }
      return { ...state, savanna: { answer: state.savanna.answer, gamewords: [...state.savanna.gamewords], lifes: [...state.savanna.lifes] } }

    default:
      return state;
  }
}

export default gameReducer;
