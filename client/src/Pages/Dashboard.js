import React from "react";
import { requireAuth } from "utils";

export const Dashboard = (props) => {
  return (
    <div>This is a protected Page. Should only been seen if authenticated</div>
  );
};

export default requireAuth(Dashboard);
