import { GET_WORDS, SET_PAGE, SET_GROUP, SET_LOADER } from "../actions/wordsActions";

const initialState = {
  wordsList: [],
  page: 0,
  group: 0,
  loader: false,
};

const wordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WORDS:
      return { ...state, wordsList: action.payload }

    case SET_PAGE:
      return { ...state, page: action.payload }

    case SET_GROUP:
      return { ...state, page: action.payload.page, group: action.payload.group }

    case SET_LOADER:
      return { ...state, loader: action.payload }

    default:
      return state;
  }
}

export default wordsReducer;
