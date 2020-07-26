import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
  Button,
} from "reactstrap";

const WizardComponent = (props) => {
  const [activeStep, setActiveStep] = useState(
    props.activeStep ? props.activeStep : 0
  );

  const handlePreviousStep = (index) => {
    if (activeStep >= index) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleMiddleStep = () => {
    setActiveStep(activeStep + 1);
  };

  const onSubmit = (data) => {
    if (props.steps.length - 1 === activeStep) handleLastStep(data);
    else handleMiddleStep();
  };

  const handleLastStep = (data) => {
    if (props.steps.length - 1 === activeStep && props.onFinish) {
      props.onFinish(data);
    }
  };

  return (
    <React.Fragment>
      <div className="mb-3 d-flex justify-content-center">
        <h2>{props.steps[activeStep].heading}</h2>
      </div>
      <Nav
        className={`vx-wizard ${props.className ? props.className : ""}`}
        tabs
      >
        {props.steps.map((item, i) => {
          return (
            <NavItem className="step-wrapper" key={i}>
              <NavLink
                className={classnames(`step step-${i}`, {
                  active: activeStep === i ? true : false,
                  done: i < activeStep,
                })}
              >
                <span className="step-text">{item.title}</span>
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>
      <TabContent
        className={`vx-wizard-content ${
          props.tabPaneClass ? props.tabPaneClass : ""
        }`}
        activeTab={activeStep}
      >
        {props.steps.map((item, i) => {
          return (
            <TabPane
              className={`step-content step-${i}-content`}
              key={i}
              tabId={i}
            >
              <Form
                className="form-horizontal"
                onSubmit={props.handleSubmit(onSubmit)}
              >
                {item.content}
                {props.pagination ? (
                  <div className="wizard-actions d-flex justify-content-between">
                    <Button
                      color="primary"
                      disabled={activeStep === 0}
                      onClick={() => handlePreviousStep(i)}
                    >
                      Prev
                    </Button>
                    <Button type="submit" color="primary">
                      {props.steps.length - 1 === i && !props.finishBtnText
                        ? "Submit"
                        : props.steps.length - 1 === i && props.finishBtnText
                        ? props.finishBtnText
                        : "Next"}
                    </Button>
                  </div>
                ) : null}
              </Form>
            </TabPane>
          );
        })}
      </TabContent>
    </React.Fragment>
  );
  // }
};

WizardComponent.propTypes = {
  className: PropTypes.string,
  steps: PropTypes.array.isRequired,
  enableAllSteps: PropTypes.bool,
  finishBtnText: PropTypes.string,
  onFinish: PropTypes.func,
  pagination: PropTypes.bool,
  onValidationError: PropTypes.func,
  activeStep: PropTypes.number,
};

WizardComponent.defaultProps = {
  pagination: true,
};

export default WizardComponent;
