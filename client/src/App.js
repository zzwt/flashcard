import React from "react";
import { Home, DeckGroups, Decks, Dashboard, Login, Register } from "Pages";
import { Navbar, Alerts, DeckForm } from "Components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthState, AlertState, DeckState } from "Context";
import { setAuthHeader } from "utils";

import "bootstrap/dist/css/bootstrap.min.css";

if (localStorage.getItem("token")) setAuthHeader(localStorage.getItem("token"));

function App() {
  return (
    <AlertState>
      <AuthState>
        <DeckState>
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
                <Route
                  path="/dashboard/deck-groups"
                  component={DeckGroups}
                  exact
                />
                <Route path="/save-decks/:id?" component={DeckForm} />
              </Switch>
            </div>
          </Router>
        </DeckState>
      </AuthState>
    </AlertState>
  );
}

export default App;
