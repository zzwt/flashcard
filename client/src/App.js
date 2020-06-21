import React from "react";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Alerts from "./Components/Alerts";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import AuthState from "./Context/AuthContext/AuthState";
import AlertState from "./Context/AlertContext/AlertState";
import Protected from "./Pages/Protected";
import { setAuthHeader } from "./utils";

if (localStorage.getItem("token")) setAuthHeader(localStorage.getItem("token"));

function App() {
  return (
    <AlertState>
      <AuthState>
        <Router>
          <div className="App">
            <Navbar />
            <Alerts />
            <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/register" component={Register}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/protected" component={Protected}></Route>
            </Switch>
          </div>
        </Router>
      </AuthState>
    </AlertState>
  );
}

export default App;
