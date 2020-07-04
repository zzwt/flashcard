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
import Dashboard from "./Pages/Dashboard";
import { setAuthHeader } from "./utils";
import Decks from "./Pages/Decks";
import Subjects from "./Pages/Subjects";
import DeckForm from "./Components/DeckForm";

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
              <Route path="/" component={Home} exact />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/dashboard" component={Dashboard} exact />
              <Route path="/dashboard/decks" component={Decks} exact />
              <Route path="/dashboard/subjects" component={Subjects} exact />
              <Route path="/save-deck/:id?" component={DeckForm} />
            </Switch>
          </div>
        </Router>
      </AuthState>
    </AlertState>
  );
}

export default App;
