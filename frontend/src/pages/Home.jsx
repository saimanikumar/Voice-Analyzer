import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  
  return (
    <div className="home-main" data-aos="zoom-in">
      <div className="home">
        <h1>Welcome To The React Voice Analyzer App</h1>
      </div>
      {currentUser ? (
        <Link
          to="/user/dashboard"
          style={{ textDecoration: "none" }}
          data-aos="slide-up"
        >
          <button className="btn-home">Speek your Mind</button>
        </Link>
      ) : (
        <Link className="link" to="/login">
          <button className="btn-home">Proceed</button>
        </Link>
      )}
    </div>
  );
};

export default Home;
