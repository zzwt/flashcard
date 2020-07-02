import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../Context/AuthContext/AuthContext";
import AlertContext from "../Context/AlertContext/AlertContext";
const Register = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { errors, registerUser, clearErrors, isAuthenticated } = useContext(
    AuthContext
  );
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (isAuthenticated) props.history.push("/dashboard");

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
    if (user.password !== user.passwordConfirm) {
      return setAlert({
        msg: "Password confirmation is not correct. Please check...",
      });
    }
    registerUser(user);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h1 className="my-5 display-5 text-center">Account Register</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                tpe="text"
                name="name"
                className="form-control"
                placeholder="Username"
                value={user.name}
                onChange={onChange}
                required
              />
            </div>
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
            <div className="form-group">
              <input
                type="password"
                name="passwordConfirm"
                className="form-control"
                placeholder="Password Confirm"
                value={user.passwordConfirm}
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
export default Register;
