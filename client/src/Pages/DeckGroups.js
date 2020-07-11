import React, { useContext, useEffect } from "react";
import SidebarLayout from "../Components/SidebarLayout";
import { requireAuth } from "../utils";
import DeckGroupModal from "../Components/DeckGroupModal";
import DeckContext from "../Context/DeckContext/DeckContext.js";
import AlertContext from "../Context/AlertContext/AlertContext.js";

const DeckGroups = () => {
  const {
    deckState: { deckGroups, decks, errors },
    getDeckGroups,
    createDeckGroup,
    clearErrors,
  } = useContext(DeckContext);

  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    getDeckGroups();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors) {
      setAlert(errors);
      clearErrors();
    }
  }, [errors]);

  const renderDeckGroups = () => {
    return deckGroups.map((deckGroup) => (
      <div key={deckGroup._id} className="col-md-6 col-lg-4">
        <div className="card">
          <div className="card-body">
            <div className="card-title">{deckGroup.title} </div>
            <hr></hr>
            <div className="card-text">{deckGroup.description}</div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <SidebarLayout>
      <div className="row">
        <div className="col-6">Deck Groups</div>
        <div className="col-6 text-right">
          <button
            type="button"
            className="btn btn-success"
            data-toggle="modal"
            data-target="#newDeckGroupModal"
          >
            New Deck Group
          </button>
        </div>
        {deckGroups && renderDeckGroups()}
        <DeckGroupModal
          allDecks={decks}
          selectedDecks={[]}
          id="newDeckGroupModal"
          new={true}
          onSubmit={createDeckGroup}
        />
        <DeckGroupModal
          allDecks={decks}
          selectedDecks={[]}
          id="editDeckGroupModal"
          new={false}
        />
      </div>
    </SidebarLayout>
  );
};

export default requireAuth(DeckGroups);
