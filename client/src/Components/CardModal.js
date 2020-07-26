import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
} from "reactstrap";
import { useForm } from "react-hook-form";
import classnames from "classnames";
const CardModal = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (card) => {
    if (!props.selection) {
      props.addCard(card);
    } else {
      props.editCard(card, props.selection.index);
      props.onModalClose();
    }
    props.toggleModal();
  };

  return (
    <Modal
      isOpen={props.open}
      toggle={props.toggleModal}
      className={props.className}
      keyboard={false}
      backdrop={"static"}
    >
      <ModalHeader
        toggle={() => {
          props.toggleModal();
          props.onModalClose();
        }}
      >
        {props.selection ? "Change Card" : "Create a New Card"}
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="question">Question / Term</Label>
          <input
            type="text"
            name="question"
            placeholder="Question / Term"
            defaultValue={
              props.selection && props.selection.selectedCard.question
            }
            className={classnames("form-control", {
              isInvalid: errors.question,
            })}
            ref={register({ required: true })}
          />
          {errors.question && (
            <span className="isInvalid">Question / Term is required</span>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="answer">Answer</Label>
          <input
            type="text"
            name="answer"
            placeholder="Answer / Description"
            defaultValue={
              props.selection && props.selection.selectedCard.answer
            }
            className={classnames("form-control", {
              isInvalid: errors.answer,
            })}
            ref={register({ required: true })}
          />
          {errors.answer && (
            <span className="isInvalid">Answer / Description is required</span>
          )}
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" outline onClick={handleSubmit(onSubmit)}>
          {props.selection ? "Change" : "Create"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CardModal;
