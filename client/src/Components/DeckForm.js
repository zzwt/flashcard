import React, { useState, useEffect, useContext, Fragment } from "react";
import { AlertContext, DeckContext } from "Context";
import classnames from "classnames";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Row,
  Col,
  Form,
  Button,
  Label,
} from "reactstrap";
import CardList from "./CardList";
import { useForm } from "react-hook-form";

export default function DeckForm(props) {
  const [cards, setCards] = useState(
    // Array.from({ length: 19 }, (x, i) => ({ question: i + 1, answer: i + 1 }))
    []
  );
  const { register, handleSubmit, errors, setValue } = useForm();

  const { setAlert } = useContext(AlertContext);
  const {
    deckState: { errors: deckErrors },
    getDeck,
    updateDeck,
    clearErrors,
  } = useContext(DeckContext);

  useEffect(() => {
    const { id } = props.match.params;
    if (id) {
      getDeck(id)
        .then(({ title, description, cards }) => {
          setValue("title", title);
          setValue("description", description);
          setCards(cards);
        })
        .catch((deckErrors) => {
          setAlert(deckErrors);
          clearErrors();
          props.history.push("/dashboard/decks");
        });
    }
    //eslint-disable-next-line
  }, []);

  const onSubmit = async (data) => {
    const { id } = props.match.params;
    if (id) {
      await updateDeck({
        ...data,
        id,
        cards,
      });
    }
    if (deckErrors) {
      setAlert(deckErrors);
      clearErrors();
    }
    props.history.push("/dashboard/decks");
  };

  return (
    <Fragment>
      <Card>
        <CardHeader className="justify-content-center mt-2">
          <h2>Edit Deck</h2>
        </CardHeader>
        <CardBody>
          <Form className="mt-2">
            <Row>
              <Col md="12" sm="12" className="mb-3">
                <h5 className="mb-2">1. Deck Title and Description</h5>
                <Row className="mb-1">
                  <Col md="6" sm="12">
                    <FormGroup className="form-label-group">
                      <Label for="title">Title</Label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter the Title"
                        ref={register({ required: true })}
                        className={classnames("form-control", {
                          isInvalid: errors.title,
                        })}
                      />
                      {errors.title && (
                        <span className="isInvalid">Title is required</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup className="form-label-group">
                      <input
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Enter Description"
                        className="form-control"
                        ref={register()}
                      />
                      <Label for="description">Description</Label>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col md="12" sm="12">
                <Row className="mb-1">
                  <Col xs="6" className="align-items-center">
                    <h5 className="mb-2">2. Cards</h5>
                  </Col>
                </Row>
                <FormGroup className="form-label-group">
                  <CardList cards={cards} setCards={setCards} />
                </FormGroup>
              </Col>

              <Col sm="12" className="text-center">
                <FormGroup className="form-label-group">
                  <Button.Ripple
                    outline
                    color="warning"
                    type="reset"
                    className="mb-1 mr-4"
                    onClick={(event) => {
                      props.history.push("/dashboard/decks");
                    }}
                  >
                    Cancel
                  </Button.Ripple>
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mb-1"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Submit
                  </Button.Ripple>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
}
