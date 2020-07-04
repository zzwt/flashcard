const { GET_DECKS, GET_DECKS_FAIL, CLEAR_ERRORS } = require("../Types");

const DeckReducer = (state, action) => {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        decks: action.payload,
      };
    case GET_DECKS_FAIL:
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