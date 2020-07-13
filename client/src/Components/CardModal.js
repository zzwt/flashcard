import React, { useState, useEffect } from "react";

const CardModal = (props) => {
  const [card, setCard] = useState({ question: "", answer: "" });

  useEffect(() => {
    if (props.selection) {
      const {
        selectedCard: { question, answer },
      } = props.selection;
      setCard({ question: question, answer: answer });
    }
  }, [props.selection]);

  const onChange = (event) => {
    event.preventDefault();
    setCard({ ...card, [event.target.name]: event.target.value });
  };

  const onSubmit = () => {
    if (props.new) {
      props.addCard(card);
    } else {
      props.editCard(card, props.selection.index);
      props.onModalClose();
    }
    setCard({ question: "", answer: "" });
  };
  return (
    <div className="modal" id={props.id}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {props.new ? "New Card" : "Edit Card"}
            </h5>
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
                onSubmit();
              }}
            >
              {props.new ? "Add" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
