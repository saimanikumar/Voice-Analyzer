import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center text-center">
        <div className="col-md-8">
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
                <button className="btn-home">Speak Your Mind</button>
              </Link>
            ) : (
              <Link className="link" to="/login">
                <button className="btn-home">Proceed</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


