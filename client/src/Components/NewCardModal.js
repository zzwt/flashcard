import React, { useState } from "react";

const NewCardModal = (props) => {
  const [card, setCard] = useState({ question: "", answer: "" });

  const onChange = (event) => {
    event.preventDefault();
    setCard({ ...card, [event.target.name]: event.target.value });
  };

  return (
    <div className="modal" id="newCardModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New Card</h5>
            <button className="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div className="modal-body">
            {/* <form> */}
            <div className="form-group">
              <label htmlFor="question">Question</label>
              <input
                type="text"
                name="question"
                placeholder="Question / Term"
                className="form-control"
                value={card.question}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="answer">Answer</label>
              <input
                type="text"
                name="answer"
                placeholder="Answer / Description"
                className="form-control"
                value={card.answer}
                onChange={onChange}
              />
            </div>
            {/* </form> */}
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={() => {
                props.addCard(card);
                setCard({ question: "", answer: "" });
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCardModal;
