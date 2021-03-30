import { SET_WORDS, SET_WORDS_AVERAGE, SET_LOADER, WORD_PLAYING, SET_WORD_USER, DELETE_WORD_USER, SET_DELETE_WORDS_IN_GROUP } from "../actions/ebookActions";

const initialState = {
  wordsList: [],
  wordsGroupDelete: [],
  wordPlaying: null,
  loader: false,
  totalCount: 0
};

const ebookReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WORDS:
      return { ...state, wordsList: action.payload.map(word => ({ ...word, _id: word.id })) }

    case SET_WORDS_AVERAGE:
      return { ...state, wordsList: action.payload.words || [], totalCount: action.payload.totalCount || 0 }

    case SET_DELETE_WORDS_IN_GROUP:
      return { ...state, wordsGroupDelete: action.payload.words || [] }

    case SET_WORD_USER:
      const addDifficultyWords = state.wordsList.map(word => word._id === action.payload.wordId ? { ...word, userWord: action.payload } : word);
      const filterDeleteWords = addDifficultyWords.filter(word => word.userWord?.optional?.isDelete !== true);
      const deleteWord = addDifficultyWords.filter(word => word.userWord?.optional?.isDelete === true);
      return { ...state, wordsList: filterDeleteWords, wordsGroupDelete: [...state.wordsGroupDelete, ...deleteWord] }

    case DELETE_WORD_USER:
      return { ...state, wordsList: state.wordsList.filter(word => word._id !== action.payload) }

    case WORD_PLAYING:
      return { ...state, wordPlaying: action.payload }

    case SET_LOADER:
      return { ...state, loader: action.payload }

    default:
      return state;
  }
}

export default ebookReducer;
