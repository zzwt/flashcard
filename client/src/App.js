import React from "react";
import Router from "./Router";
import { AuthState, AlertState, DeckState } from "Context";
import { setAuthHeader } from "utils";

if (localStorage.getItem("token")) setAuthHeader(localStorage.getItem("token"));

function App() {
  return (
    <AlertState>
      <AuthState>
        <DeckState>
          <Router />
        </DeckState>
      </AuthState>
    </AlertState>
  );
}

export default App;
