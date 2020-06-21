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
    // let idsToRemove = [];
    console.log(errors);
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

    // dispatch({
    //   type: SET_ALERT,
    //   payload: errors.map((error) => {
    //     const id = uuidv4();
    //     idsToRemove.push(id);
    //     error.id = id;
    //     return error;
    //   }),
    // });

    // return idsToRemove.map((id) => {
    //   return setTimeout(() => {
    //     dispatch({
    //       type: REMOVE_ALERT,
    //       payload: id,
    //     });
    //   }, timeout);
    // });
  };

  return (
    <AlertContext.Provider value={{ alerts: state, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};
export default AlertState;
