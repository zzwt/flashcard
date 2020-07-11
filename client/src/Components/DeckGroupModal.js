import React, { useState, useEffect } from "react";

const DeckGroupModal = (props) => {
  const [deckGroup, setDeckGroup] = useState({
    title: "",
    description: "",
  });
  const [searchKey, setSearchKey] = useState("");
  const [allDecks, setAllDecks] = useState(null);
  useEffect(() => {
    setDecksField();
    //eslint-disable-next-line
  }, [props.allDecks]);

  const onChange = (event) => {
    const { name, value } = event.target;
    event.preventDefault();
    setDeckGroup({ ...deckGroup, [name]: value });
  };

  const searchKeyChange = (event) => {
    event.preventDefault();
    setSearchKey(event.target.value);
  };

  const onDeckSelected = (event) => {
    setAllDecks(
      allDecks.map((deck) => {
        if (deck._id === event.target.id) deck.checked = !deck.checked;
        return deck;
      })
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();

    props.onSubmit({
      ...deckGroup,
      decks: allDecks.filter((deck) => deck.checked).map((deck) => deck._id),
    });
    clearFormFields();
  };

  const clearFormFields = () => {
    setDeckGroup({ title: "", description: "" });
    setDecksField();
  };

  const setDecksField = () => {
    if (props.allDecks) {
      const temp = props.allDecks.map((deck) => ({
        ...deck,
        checked: props.selectedDecks.map((deck) => deck._id).includes(deck._id),
      }));
      setAllDecks(temp);
    }
  };

  const renderDecks = () => {
    return allDecks
      .filter((deck) =>
        deck.title.toLowerCase().includes(searchKey.toLowerCase())
      )
      .map((deck) => {
        return (
          <div key={deck._id} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={deck._id}
              id={deck._id}
              onChange={onDeckSelected}
              checked={deck.checked}
            />
            <label className="form-check-label" htmlFor={deck._id}>
              {deck.title}
            </label>
          </div>
        );
      });
  };
  return (
    <div className="modal" id={props.id}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {props.new ? "New Deck Group" : "Edit Deck Group"}
            </h5>
            <button
              className="close"
              data-dismiss="modal"
              onClick={() => clearFormFields()}
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div>
              {/* To do this form as title field is required */}
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="form-control"
                  value={deckGroup.title}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="form-control"
                  value={deckGroup.description}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="search">Search Decks</label>
                <input
                  type="text"
                  name="search"
                  placeholder="Type Deck Name"
                  className="form-control"
                  value={searchKey}
                  onChange={searchKeyChange}
                />
              </div>
              <div className="form-group">
                {allDecks && allDecks.length > 0
                  ? renderDecks()
                  : "No Decks. Please Create One First."}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={onSubmit}
                >
                  {props.new ? "Create" : "Edit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeckGroupModal;
