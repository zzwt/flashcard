import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "Context";

// import { Redirect } from "react-router-dom";
export const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else delete axios.defaults.headers.common["x-auth-token"];
};

export const requireAuth = (Component) => {
  return (props) => {
    // if not authenticated, return to login page
    const { isAuthenticated, loading } = useContext(AuthContext);
    if (!isAuthenticated && !loading) {
      props.history.push("/");
    }
    // else render component
    return <Component {...props} />;
  };
};
