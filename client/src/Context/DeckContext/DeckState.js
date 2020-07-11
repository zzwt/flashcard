import React, { useReducer } from "react";
import DeckContext from "./DeckContext";
import DeckReducer from "./DeckReducer";
import axios from "axios";
const {
  GET_DECKS,
  GET_DECKS_FAIL,
  CLEAR_ERRORS,
  CREATE_DECK_FAIL,
  GET_DECK_FAIL,
  DELETE_DECK_FAIL,
  DELETE_DECK,
  GET_DECK_GROUPS,
  GET_DECK_GROUPS_FAIL,
  CREATE_DECK_GROUP,
  CREATE_DECK_GROUP_FAIL,
} = require("../Types");

const DeckState = (props) => {
  const initialState = {
    decks: null,
    errors: null,
    deckGroups: null,
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
      return response.data;
    } catch (err) {
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

  const getDeck = async (id) => {
    const inDeck = state.decks && state.decks.find((deck) => deck._id === id);
    if (inDeck) return Promise.resolve(inDeck);
    try {
      const response = await axios.get(`/api/decks/${id}`);
      return response.data;
    } catch (err) {
      dispatch({
        type: GET_DECK_FAIL,
        payload: err.response.data,
      });
      return Promise.reject(err.response.data);
    }
  };

  const deleteDeck = async (id) => {
    try {
      const response = await axios.delete(`/api/decks/${id}`);
      if (response.data.ok === 1) {
        dispatch({
          type: DELETE_DECK,
          payload: state.decks.filter((deck) => deck._id !== id),
        });
      }
    } catch (err) {
      dispatch({
        type: DELETE_DECK_FAIL,
        payload: err.response.data,
      });
    }
  };

  const getDeckGroups = async () => {
    let decks = state.decks;

    try {
      if (!decks) {
        decks = await getDecks();
      }

      const responseDeckGroups = await axios.get(`/api/deck-groups`);
      const payload = responseDeckGroups.data.map((deckGroup) => {
        deckGroup.decks = deckGroup.decks.map((deckId) =>
          decks.find((deck) => deck._id === deckId)
        );
        return deckGroup;
      });
      dispatch({
        type: GET_DECK_GROUPS,
        payload,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_DECK_GROUPS_FAIL,
        payload: err.response.data,
      });
    }
  };

  const createDeckGroup = async (newDeckGroup) => {
    try {
      const newDeckGroupResponse = await axios.post(
        "/api/deck-groups",
        newDeckGroup
      );
      dispatch({
        type: CREATE_DECK_GROUP,
        payload: newDeckGroupResponse.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: CREATE_DECK_GROUP_FAIL,
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
      value={{
        deckState: state,
        getDecks,
        clearErrors,
        createDeck,
        getDeck,
        deleteDeck,
        getDeckGroups,
        createDeckGroup,
      }}
    >
      {props.children}
    </DeckContext.Provider>
  );
};
export default DeckState;
