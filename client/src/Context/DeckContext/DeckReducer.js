const {
  GET_DECKS,
  GET_DECKS_FAIL,
  CLEAR_ERRORS,
  CREATE_DECK_FAIL,
  DELETE_DECK_FAIL,
  GET_DECK_FAIL,
  DELETE_DECK,
} = require("../Types");

const DeckReducer = (state, action) => {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        decks: action.payload,
      };
    case DELETE_DECK:
      return {
        ...state,
        decks: action.payload,
      };
    case GET_DECKS_FAIL:
    case CREATE_DECK_FAIL:
    case GET_DECK_FAIL:
    case DELETE_DECK_FAIL:
      return {
        ...state,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null,
      };
    default:
      return state;
  }
};

export default DeckReducer;
