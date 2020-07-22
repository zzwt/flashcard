import React from "react";
// import themeConfig from "../configs/themeConfig";
import classnames from "classnames";
import { Alerts } from "Components/";

const FullPageLayout = ({ children, ...rest }) => {
  return (
    <div
      className={classnames(
        "full-layout wrapper bg-full-screen-image blank-page dark-layout"
        // below is useless
        // {
        //   "layout-dark": themeConfig.layoutDark,
        // }
      )}
    >
      <div className="app-content">
        <div className="content-wrapper">
          <div className="content-body">
            <div className="flexbox-container">
              <Alerts />
              <main className="main w-100">{children}</main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPageLayout;
