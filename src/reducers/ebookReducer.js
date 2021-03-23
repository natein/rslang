import { GET_WORDS, SET_LOADER, WORD_PLAYING } from "../actions/ebookActions";

const initialState = {
  wordsList: [],
  wordPlaying: null,
  loader: false,
};

const ebookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WORDS:
      return { ...state, wordsList: action.payload }

    case WORD_PLAYING:
      return { ...state, wordPlaying: action.payload }

    case SET_LOADER:
      return { ...state, loader: action.payload }

    default:
      return state;
  }
}

export default ebookReducer;
