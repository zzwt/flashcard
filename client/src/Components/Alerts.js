import React, { useContext } from "react";
import { AlertContext } from "Context";

const Alerts = () => {
  const { alerts } = useContext(AlertContext);

  const renderAlerts = () => {
    return alerts.map((alert) => {
      return (
        <div key={alert.id} className="row">
          <div className="col alert alert-danger">{alert.msg}</div>
        </div>
      );
    });
  };
  return alerts.length > 0 ? (
    <div className="container mt-3">{renderAlerts()}</div>
  ) : null;
};
export default Alerts;
