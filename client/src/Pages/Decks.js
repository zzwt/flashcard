import React, { useEffect, useContext, Fragment } from "react";
import { requireAuth } from "utils";
import { Link } from "react-router-dom";
import { AlertContext, DeckContext } from "Context";

const Decks = () => {
  const { setAlert } = useContext(AlertContext);
  const {
    deckState: { decks, errors },
    getDecks,
    clearErrors,
    deleteDeck,
  } = useContext(DeckContext);

  useEffect(() => {
    getDecks();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors) {
      setAlert(errors);
      clearErrors();
    }
    //eslint-disable-next-line
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
                  <Link to={`/edit-decks/${deck._id}`}>
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
    <Fragment>
      <button className="btn btn-dark">
        <Link to="/new-decks">Add New</Link>
      </button>
      <div className="row">{renderDecks()}</div>
    </Fragment>
  );
};

export default requireAuth(Decks);
