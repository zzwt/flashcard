import React, { Fragment, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext/AuthContext";
import { withRouter, matchPath } from "react-router";

export const Navbar = (props) => {
  const { logoutUser, isAuthenticated, currentUser } = useContext(AuthContext);

  const onLogout = () => {
    logoutUser();
  };

  const userLinks = () => {
    if (currentUser && currentUser.name) {
      return (
        <Fragment>
          <li className="nav-item align-self-center">
            Hello, {currentUser.name}
          </li>
          <li className="nav-item">
            <Link className="nav-link" onClick={onLogout}>
              Logout
            </Link>
          </li>
        </Fragment>
      );
    }
  };

  const guestLinks = () => {
    const { url } = props.match;
    console.log(matchPath);
    return (
      <Fragment>
        <li className="nav-item">
          <NavLink className="nav-link" to="/" exact>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">
            Register
          </NavLink>
        </li>
      </Fragment>
    );
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="#">
          Logo here
        </Link>
        <ul className="navbar-nav ml-auto">
          {isAuthenticated ? userLinks() : guestLinks()}
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
