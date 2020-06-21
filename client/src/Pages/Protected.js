import React, { useEffect, useContext } from "react";
import AuthContext from "../Context/AuthContext/AuthContext";
import { requireAuth } from "../utils";
export const Protected = (props) => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div>This is a protected Page. Should only been seen if authenticated</div>
  );
};

export default requireAuth(Protected);
