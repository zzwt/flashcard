import React, { useState, useEffect, useContext } from "react";
import SidebarLayout from "../Components/SidebarLayout";
import { requireAuth } from "../utils";
import { Link } from "react-router-dom";
import axios from "axios";
import AlertContext from "../Context/AlertContext/AlertContext";

const Decks = () => {
  const { setAlert } = useContext(AlertContext);
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        const response = await axios.get("/api/decks");
        console.log(response.data);
        setDecks(response.data);
      } catch (err) {
        setAlert(err.response.data);
      }
    }
    fetchData();
  }, []);

  const renderDecks = () => {
    return decks.map((deck) => (
      <div className="col-md-6 col-lg-4">
        <div className="card">
          <div className="card-body">
            <div className="card-title">
              {deck.title}{" "}
              <span>
                <Link to={`/save-deck/${deck._id}`}>
                  <button className="btn-primary">Edit</button>
                </Link>
              </span>
            </div>
            <hr></hr>
            <div className="card-text">{deck.description}</div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <SidebarLayout>
      <div className="container bg-light">
        <button className="btn btn-dark">
          <Link to="/save-deck">Add New</Link>
        </button>
        <div className="row">{renderDecks()}</div>
      </div>
    </SidebarLayout>
  );
};

export default requireAuth(Decks);
