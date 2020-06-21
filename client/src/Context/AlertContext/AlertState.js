import React, { useReducer } from "react";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../Types";
import { v4 as uuidv4 } from "uuid";
const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Actions
  const setAlert = (errors, timeout = 3000) => {
    if (!errors.errors) {
      errors = [errors];
    } else {
      errors = errors.errors;
    }

    return errors.map((error) => {
      const id = uuidv4();
      error.id = id;
      dispatch({
        type: SET_ALERT,
        payload: error,
      });
      setTimeout(() => {
        dispatch({
          type: REMOVE_ALERT,
          payload: id,
        });
      }, timeout);
      return id;
    });
  };

  return (
    <AlertContext.Provider value={{ alerts: state, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};
export default AlertState;
