import React, { useReducer } from "react";
import DeckContext from "./DeckContext";
import DeckReducer from "./DeckReducer";
import axios from "axios";
const {
  GET_DECKS,
  GET_DECKS_FAIL,
  CLEAR_ERRORS,
  CREATE_DECK_FAIL,
} = require("../Types");
// import { v4 as uuidv4 } from "uuid";
const DeckState = (props) => {
  const initialState = {
    decks: null,
    errors: null,
  };

  const [state, dispatch] = useReducer(DeckReducer, initialState);

  // Actions
  const getDecks = async () => {
    try {
      const response = await axios.get("/api/decks");
      dispatch({
        type: GET_DECKS,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_DECKS_FAIL,
        payload: err.response.data,
      });
    }
  };

  const createDeck = async (newDeck) => {
    try {
      await axios.post("/api/decks", newDeck);
    } catch (err) {
      dispatch({
        type: CREATE_DECK_FAIL,
        payload: err.response.data,
      });
    }
  };

  const clearErrors = async () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  return (
    <DeckContext.Provider
      value={{ deckState: state, getDecks, clearErrors, createDeck }}
    >
      {props.children}
    </DeckContext.Provider>
  );
};
export default DeckState;
