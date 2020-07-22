import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  LOAD_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "Context";
import axios from "axios";
import { setAuthHeader } from "utils";

const AuthState = (props) => {
  const initialState = {
    currentUser: null,
    isAuthenticated: false,
    loading: true,
    token: localStorage.getItem("token") || null,
    errors: null,
    role: "admin",
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Actions
  // Register User
  const registerUser = async (user) => {
    try {
      const response = await axios.post("/api/users", user, {
        header: {
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data.token,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data,
      });
    }
  };

  // Load User
  const loadUser = async () => {
    if (localStorage.token) setAuthHeader(localStorage.token);

    try {
      const response = await axios.get("/api/auth");
      // console.log(response.data);
      dispatch({
        type: LOAD_USER,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data,
      });
    }
  };

  // Login User
  const loginUser = async (user) => {
    try {
      const response = await axios.post("/api/auth", user, {
        header: {
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data.token,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data,
      });
    }
  };

  const logoutUser = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  // const changeRole = role => {
  //   dispatch({ type: "CHANGE_ROLE", payload: role })
  // }

  // Clear Errors
  const clearErrors = async () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        registerUser,
        clearErrors,
        loadUser,
        loginUser,
        logoutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
