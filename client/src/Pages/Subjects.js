import React from "react";
import SidebarLayout from "../Components/SidebarLayout";
import { requireAuth } from "../utils";
import { Link } from "react-router-dom";

const Subjects = () => {
  return (
    <SidebarLayout>
      <button className="btn btn-dark">
        <Link to="/subjects-new">Add New</Link>
      </button>
    </SidebarLayout>
  );
};

export default requireAuth(Subjects);
