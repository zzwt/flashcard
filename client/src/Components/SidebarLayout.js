import React, { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../Context/AuthContext/AuthContext";

const SidebarLayout = (props) => {
  const { loadUser, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      loadUser();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-3 bg-light py-3">
          <div className="nav flex-column nav-pills">
            <NavLink className="nav-link" to="/dashboard/" exact>
              <i className="fas fa-home"></i> Dashboard
            </NavLink>
            <NavLink
              className="nav-link"
              to="/dashboard/decks"
              isActive={(match, location) => {
                return location.pathname.includes("decks");
              }}
            >
              <i className="fas fa-layer-group"></i> Decks
            </NavLink>
            <NavLink className="nav-link" to="/dashboard/deck-groups">
              <i className="fas fa-clipboard-list"></i> Deck Groups
            </NavLink>
          </div>
        </div>
        <div className="col-9">{props.children}</div>
      </div>
    </div>
  );
};

export default SidebarLayout;
