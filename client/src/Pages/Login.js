import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../Context/AuthContext/AuthContext";
import AlertContext from "../Context/AlertContext/AlertContext";

const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { loginUser, isAuthenticated, errors, clearErrors } = useContext(
    AuthContext
  );
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (isAuthenticated) props.history.push("/protected");

    if (errors) {
      setAlert(errors);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [errors, isAuthenticated]);

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    loginUser(user);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h1 className="my-5 display-5 text-center">Account Login</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={user.email}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={user.password}
                onChange={onChange}
                required
              />
            </div>
            <input type="submit" className="btn btn-success btn-block" />
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
