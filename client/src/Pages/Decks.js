import React, { useState, useEffect, useContext } from "react";
import SidebarLayout from "../Components/SidebarLayout";
import { requireAuth } from "../utils";
import { Link } from "react-router-dom";
import AlertContext from "../Context/AlertContext/AlertContext";
import DeckContext from "../Context/DeckContext/DeckContext";

const Decks = () => {
  const { setAlert } = useContext(AlertContext);
  const {
    deckState: { decks, errors },
    getDecks,
    clearErrors,
    deleteDeck,
  } = useContext(DeckContext);
  // const [decks, setDecks] = useState([]);

  useEffect(() => {
    getDecks();
  }, []);

  useEffect(() => {
    if (errors) {
      setAlert(errors);
      clearErrors();
    }
  }, [errors]);

  const onDelete = async (id) => {
    await deleteDeck(id);
    if (errors) {
      setAlert(errors);
      clearErrors();
    }
  };

  const renderDecks = () => {
    return (
      decks &&
      decks.map((deck) => (
        <div key={deck._id} className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                {deck.title}{" "}
                <span>
                  <Link to={`/save-deck/${deck._id}`}>
                    <button className="btn-primary">Edit</button>
                  </Link>
                  <button
                    className="btn-primary"
                    onClick={() => onDelete(deck._id)}
                  >
                    Delete
                  </button>
                </span>
              </div>
              <hr></hr>
              <div className="card-text">{deck.description}</div>
            </div>
          </div>
        </div>
      ))
    );
  };

  return (
    <SidebarLayout>
      <div className="container bg-light">
        <button className="btn btn-dark">
          <Link to="/save-deck">Add New</Link>
        </button>
        <div className="row">{renderDecks()}</div>
      </div>
    </SidebarLayout>
  );
};

export default requireAuth(Decks);
