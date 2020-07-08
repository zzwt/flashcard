import React from "react";
import SidebarLayout from "../Components/SidebarLayout";
import { requireAuth } from "../utils";
import { Link } from "react-router-dom";

const DeckGroups = () => {
  return (
    <SidebarLayout>
      {/* <button className="btn btn-dark">
        <Link to="/save-d">Add New</Link>
      </button> */}
      Deck Groups
    </SidebarLayout>
  );
};

export default requireAuth(DeckGroups);
