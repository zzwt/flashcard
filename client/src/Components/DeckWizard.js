import React, { useState, useContext } from "react";
import Wizard from "./@vuexy/wizard/WizardComponent";
import { useForm } from "react-hook-form";
import {
  // Form,
  FormGroup,
  Label,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "reactstrap";
import classnames from "classnames";
import CardList from "./CardList";
import { DeckContext, AlertContext } from "Context";
const WizardBasic = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [cards, setCards] = useState([]);
  const {
    deckState: { errors: deckErrors },
    createDeck,
    clearErrors,
  } = useContext(DeckContext);
  const { setAlert } = useContext(AlertContext);

  const onCancel = () => {
    props.history.push("/dashboard/decks");
  };

  const steps = [
    {
      title: 1,
      content: (
        <Row className="my-3">
          <Col sm={{ size: 6, offset: 3 }}>
            <FormGroup>
              <Label> Title </Label>
              <input
                type="text"
                name="title"
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
          <Col sm={{ size: 6, offset: 3 }}>
            <FormGroup>
              <Label> Description </Label>
              <input
                type="text"
                name="description"
                ref={register()}
                className="form-control"
              />
            </FormGroup>
          </Col>
        </Row>
      ),
      heading: "Create a New Deck",
    },
    {
      title: 2,
      content: (
        <Row className="my-4">
          <Col sm={{ size: 10, offset: 1 }}>
            <CardList cards={cards} setCards={setCards}></CardList>
          </Col>
        </Row>
      ),
      heading: "Add Cards",
    },
  ];

  const onFinish = async (data) => {
    // const { id } = props.match.params;
    // event.preventDefault();

    await createDeck({
      ...data,
      cards,
    });

    if (deckErrors) {
      setAlert(deckErrors);
      clearErrors();
    }
    props.history.push("/dashboard/decks");
  };

  return (
    <Card className="mt-2">
      <CardHeader className="d-block">
        <Row>
          <Col lg={{ size: 2 }}>
            <Button outline color="primary" onClick={onCancel}>
              Cancel
            </Button>
          </Col>
          {/* <Col lg={{ size: 2, offset: 3 }}>
            <h2>Create New Deck</h2>
          </Col> */}
        </Row>
      </CardHeader>
      <CardBody>
        <Wizard
          // validate
          enableAllSteps
          onFinish={onFinish}
          steps={steps}
          handleSubmit={handleSubmit}
          // errors={errors}
        />
      </CardBody>
    </Card>
  );
};

export default WizardBasic;
