import React, { useState, useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import CardModal from "./CardModal";
import ReactPaginate from "react-paginate";
import { AlertContext, DeckContext } from "Context";
import { marginPagesDisplayed, pageRangeDisplayed, perPage } from "configs";

export default function DeckForm(props) {
  const [fields, setFields] = useState({ title: "", description: "" });
  const [currentPage, setCurrentPage] = useState(0);
  const [cards, setCards] = useState(
    // Array.from({ length: 19 }, (x, i) => ({ question: i + 1, answer: i + 1 }))
    []
  );
  const [selection, setSelection] = useState(null);

  const { setAlert } = useContext(AlertContext);
  const {
    deckState: { errors },
    createDeck,
    getDeck,
    updateDeck,
    clearErrors,
  } = useContext(DeckContext);

  useEffect(() => {
    const { id } = props.match.params;
    if (id) {
      getDeck(id)
        .then(({ title, description, cards }) => {
          setFields({ title, description });
          setCards(cards);
        })
        .catch((errors) => {
          setAlert(errors);
          clearErrors();
          props.history.push("/dashboard/decks");
        });
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCurrentPage(Math.ceil(cards.length / perPage) - 1);
  }, [cards]);

  const onSubmit = async (event) => {
    const { id } = props.match.params;
    event.preventDefault();
    if (!id) {
      await createDeck({
        ...fields,
        cards,
      });
    } else {
      await updateDeck({
        ...fields,
        id,
        cards,
      });
    }
    if (errors) {
      setAlert(errors);
      clearErrors();
    }
    props.history.push("/dashboard/decks");
  };

  const onChange = (event) => {
    event.preventDefault();
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const addCard = (card) => {
    setCards([...cards, card]);
  };

  const deleteCard = (removeIndex) => {
    setCards(cards.filter((card, index) => index !== removeIndex));
  };

  const editCard = (updatedCard, index) => {
    setCards(cards.map((card, i) => (i === index ? updatedCard : card)));
    setSelection(null);
  };

  const onSelectCard = (selectedCard, index) => {
    setSelection({ selectedCard, index });
  };

  const onModalClose = () => {
    setSelection(null);
  };
  const renderCards = () => {
    const offset = currentPage * perPage;
    return (
      <ul className="list-group my-3">
        <li className="list-group-item py-1 disabled" aria-disabled="true">
          <div className="row">
            <div className="col-5">Question / Term</div>
            <div className="col-5">Answer / Description</div>
            <div className="col-2 text-center">Actions</div>
          </div>
        </li>
        {cards.slice(offset, offset + perPage).map((card, index) => {
          return (
            <li key={index} className="list-group-item">
              <div className="row">
                <div className="col-5">{card.question}</div>
                <div className="col-5">{card.answer}</div>
                <div className="col-2 text-center">
                  <a href="/#" className="text-muted">
                    <i
                      className="fas fa-pen"
                      data-toggle="modal"
                      data-target="#editCardModal"
                      onClick={() => onSelectCard(card, index + offset)}
                    ></i>
                  </a>
                  <a href="/#" className="text-muted">
                    <i
                      className="fas fa-trash-alt ml-3"
                      onClick={() => deleteCard(index + offset)}
                    ></i>
                  </a>
                </div>
              </div>
            </li>
          );
        })}
        <CardModal
          editCard={editCard}
          new={false}
          selection={selection}
          id="editCardModal"
          onModalClose={onModalClose}
        />
      </ul>
    );
  };
  const onPageChange = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <Fragment>
      <Link to="/dashboard/decks">Back</Link>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Create a new deck</label>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Enter a title"
            value={fields.title}
            onChange={onChange}
            required
          />
          <small className="form-text text-muted">
            Like: Math - Chapter 2 - Series
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            name="description"
            placeholder="Enter Description"
            value={fields.description}
            onChange={onChange}
          />
          <small className="form-text text-muted">
            Like: This is exercise set for Series
          </small>
        </div>
        <div>
          <div className="row">
            <div className="col-6">
              <h4>Cards</h4>
            </div>
            <div className="col-6 text-right">
              <button
                type="button"
                className="btn btn-success"
                data-toggle="modal"
                data-target="#newCardModal"
              >
                New Card
              </button>
            </div>
            <CardModal addCard={addCard} new={true} id="newCardModal" />
          </div>

          {renderCards()}
        </div>
        {cards.length > perPage && (
          <ReactPaginate
            pageCount={Math.ceil(cards.length / perPage)}
            marginPagesDisplayed={marginPagesDisplayed}
            pageRangeDisplayed={pageRangeDisplayed}
            forcePage={currentPage}
            onPageChange={onPageChange}
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            containerClassName={"pagination justify-content-center"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
            disabledClassName={"disabled"}
          />
        )}
        <button type="submit" className="btn btn-primary btn-block">
          {props.match.params.id ? "Save Deck" : "Create New Deck"}
        </button>
      </form>
    </Fragment>
  );
}
