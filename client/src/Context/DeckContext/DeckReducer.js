const {
  GET_DECKS,
  GET_DECKS_FAIL,
  CLEAR_ERRORS,
  CREATE_DECK_FAIL,
  DELETE_DECK_FAIL,
  GET_DECK_FAIL,
  DELETE_DECK,
  GET_DECK_GROUPS,
  GET_DECK_GROUPS_FAIL,
  CREATE_DECK_GROUP,
  CREATE_DECK_GROUP_FAIL,
  DELETE_DECK_GROUP,
  DELETE_DECK_GROUP_FAIL,
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
    case DELETE_DECK_GROUP:
      return {
        ...state,
        deckGroups: action.payload,
      };
    case CREATE_DECK_GROUP:
      return {
        ...state,
        deckGroups: [...state.deckGroups, action.payload],
      };
    case GET_DECKS_FAIL:
    case CREATE_DECK_FAIL:
    case GET_DECK_FAIL:
    case DELETE_DECK_FAIL:
    case GET_DECK_GROUPS_FAIL:
    case CREATE_DECK_GROUP_FAIL:
    case DELETE_DECK_GROUP_FAIL:
      return {
        ...state,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null,
      };
    case GET_DECK_GROUPS:
      return {
        ...state,
        deckGroups: action.payload,
      };
    default:
      return state;
  }
};

export default DeckReducer;
