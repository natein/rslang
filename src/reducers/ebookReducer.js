import { GET_WORDS, SET_LOADER, WORD_PLAYING, SET_WORD_USER } from "../actions/ebookActions";

const initialState = {
  wordsList: [],
  wordPlaying: null,
  loader: false,
};

const ebookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WORDS:
      return { ...state, wordsList: action.payload }

    case SET_WORD_USER:
      const addDifficultyWords = state.wordsList.map(word => word._id === action.payload.wordId ? { ...word, userWord: action.payload } : word);
      const filterDeleteWords = addDifficultyWords.filter(word => word.userWord?.optional?.isDelete !== true);
      return { ...state, wordsList: filterDeleteWords }

    case WORD_PLAYING:
      return { ...state, wordPlaying: action.payload }

    case SET_LOADER:
      return { ...state, loader: action.payload }

    default:
      return state;
  }
}

export default ebookReducer;
