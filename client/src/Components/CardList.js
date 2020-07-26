import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Row,
  Button,
  Col,
} from "reactstrap";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../assets/scss/plugins/extensions/drag-and-drop.scss";
import CardModal from "./CardModal";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result.map((card, index) => ({ ...card, order: index + 1 }));
};

const CardList = (props) => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState(null);

  const toggleModal = () => {
    setOpen(!open);
  };
  const addCard = (card) => {
    card.order = props.cards.length + 1;
    props.setCards([...props.cards, card]);
  };

  const deleteCard = (removeIndex) => {
    const newCards = props.cards
      .filter((card, index) => index !== removeIndex)
      .map((card, index) => {
        card.order = index + 1;
        return card;
      });
    props.setCards(newCards);
  };

  const editCard = (updatedCard, index) => {
    const newCards = props.cards.map((card, i) =>
      i === index
        ? {
            ...card,
            question: updatedCard.question,
            answer: updatedCard.answer,
          }
        : card
    );
    props.setCards(newCards);
  };

  const onSelectCard = (selectedCard, index) => {
    setSelection({ selectedCard, index });
    toggleModal();
  };

  const onModalClose = () => {
    setSelection(null);
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reOrderedCards = reorder(
      props.cards,
      result.source.index,
      result.destination.index
    );

    props.setCards([...reOrderedCards]);
  };

  return (
    <Card>
      <CardHeader className="p-0 justify-content-end mb-2 mr-4">
        <Button
          color="primary"
          className="add-card"
          onClick={(e) => {
            e.preventDefault();
            toggleModal();
          }}
        >
          +
        </Button>
      </CardHeader>
      <CardBody className="p-0">
        <ListGroup id="list-group-dnd">
          <ListGroupItem>
            <Row>
              <div className="col-5">Questions / Terms</div>
              <div className="col-5">Answers / Descriptions</div>
              <div className="col-2 text-center">Actions</div>
            </Row>
          </ListGroupItem>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                  {props.cards.map((card, index) => {
                    return (
                      <Draggable
                        key={index}
                        draggableId={card.order.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="drag-wrapper"
                          >
                            <ListGroupItem>
                              <Row key={index}>
                                <div className="col-1">{card.order}</div>
                                <div className="col-4">{card.question}</div>
                                <div className="col-5">{card.answer}</div>
                                <div className="col-2 text-center">
                                  <Row>
                                    <Col md={{ size: 3, offset: 3 }}>
                                      <a
                                        href="/#"
                                        className="text-muted"
                                        onClick={(event) => {
                                          event.preventDefault();
                                          onSelectCard(card, index);
                                        }}
                                      >
                                        <i className="fas fa-pen"></i>
                                      </a>
                                    </Col>
                                    <Col md="3">
                                      <a
                                        href="/#"
                                        className="text-muted"
                                        onClick={(event) => {
                                          event.preventDefault();
                                          deleteCard(index);
                                        }}
                                      >
                                        <i className="fas fa-trash-alt"></i>
                                      </a>
                                    </Col>
                                  </Row>
                                </div>
                              </Row>
                            </ListGroupItem>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </ListGroup>
      </CardBody>
      <CardModal
        open={open}
        toggleModal={toggleModal}
        addCard={addCard}
        editCard={editCard}
        selection={selection}
        onModalClose={onModalClose}
      />
    </Card>
  );
};

CardList.propTypes = {
  cards: PropTypes.array.isRequired,
  setCards: PropTypes.func.isRequired,
};

export default CardList;
