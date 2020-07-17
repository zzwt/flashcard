import { SidebarLayout } from "Components";
import React from "react";
import { requireAuth } from "utils";

export const Dashboard = (props) => {
  return (
    <SidebarLayout>
      <div>
        This is a protected Page. Should only been seen if authenticated
      </div>
    </SidebarLayout>
  );
};

export default requireAuth(Dashboard);
