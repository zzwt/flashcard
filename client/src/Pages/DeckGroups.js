import React, { useContext, useEffect, useState } from "react";
import { SidebarLayout, DeckGroupModal } from "Components";
import { requireAuth } from "utils";
import { DeckContext, AlertContext } from "Context";

const DeckGroups = () => {
  const {
    deckState: { deckGroups, decks, errors },
    getDeckGroups,
    createDeckGroup,
    clearErrors,
    deleteDeckGroup,
    updateDeckGroup,
  } = useContext(DeckContext);

  const { setAlert } = useContext(AlertContext);

  const [selectedDeckGroup, setSelectedDeckGroup] = useState(null);

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

  const onEdit = (deckGroup) => {
    setSelectedDeckGroup(deckGroup);
  };

  const clearSelectedDeckGroup = () => {
    setSelectedDeckGroup(null);
  };

  const renderDeckGroups = () => {
    return deckGroups.map((deckGroup) => (
      <div key={deckGroup._id} className="col-md-6 col-lg-4">
        <div className="card">
          <div className="card-body">
            <div className="card-title">
              {deckGroup.title}
              <button
                className="btn btn-success"
                data-toggle="modal"
                data-target="#editDeckGroupModal"
                onClick={() => {
                  onEdit(deckGroup);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-success"
                onClick={() => {
                  deleteDeckGroup(deckGroup._id);
                }}
              >
                Delete
              </button>
            </div>
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
          selectedDeckGroup={selectedDeckGroup}
          id="newDeckGroupModal"
          new={true}
          onSubmit={createDeckGroup}
        />
        <DeckGroupModal
          allDecks={decks}
          selectedDeckGroup={selectedDeckGroup}
          id="editDeckGroupModal"
          new={false}
          onSubmit={updateDeckGroup}
          clearSelectedDeckGroup={clearSelectedDeckGroup}
        />
      </div>
    </SidebarLayout>
  );
};

export default requireAuth(DeckGroups);
