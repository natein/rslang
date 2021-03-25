import { SET_WORD, SET_LOADER } from "../actions/userWordsActions";

const initialState = {
  word: [],
  loader: false,
};

const userWordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WORD:
      return { ...state, word: [...state.word, action.payload] }

    case SET_LOADER:
      return { ...state, loader: action.payload }

    default:
      return state;
  }
}

export default userWordsReducer;
