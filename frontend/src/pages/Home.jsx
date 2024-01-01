import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Footer from "../components/Footer";


const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="container mb-5">
      <div className="row justify-content-center align-items-center text-center">
        <div className="col-md-8">
          <div className="home-main" data-aos="zoom-in">
            {currentUser ? (
              <>
                <div className="home">
                  <h1>Welcome {currentUser?.User?.username} </h1>
                </div>

                <Link
                  to="/user/dashboard"
                  style={{ textDecoration: "none" }}
                  data-aos="slide-up"
                >
                  <button className="btn-home">Speak Your Mind</button>
                </Link>
              </>
            ) : (
              <>
                <div className="home">
                  <h1>Welcome To The React Voice Analyzer App</h1>
                </div>
                <Link className="link" to="/login">
                  <button className="btn btn-home">Proceed</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
