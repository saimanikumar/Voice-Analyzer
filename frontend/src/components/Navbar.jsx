import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Logo from "../images/logo.png";
// import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light p-4">
      <div className="container">
        <Link to="/" className="navbar-brand">
          {/* <img src={Logo} alt="logo" /> */}
          <h2>Voice Analyzer</h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li></li>
            {/* Add other links here if needed */}
          </ul>
          <div className="d-flex align-items-center">
            {currentUser ? (
              <>
                <Link
                  to="/user/dashboard"
                  style={{ textDecoration: "none" }}
                  className="me-3"
                >
                  <span className="link">Speak</span>
                </Link>

                <Link
                  to="/user/speeches"
                  style={{ textDecoration: "none" }}
                  className="me-3"
                >
                  <span className="link">Speeches</span>
                </Link>

                <Link
                  to="/user/update"
                  style={{ textDecoration: "none" }}
                  className="me-3"
                >
                  <span className="link">{currentUser?.User?.username}</span>
                </Link>

                <Link to="/login" style={{ textDecoration: "none" }}>
                  <span className="link" onClick={logout}>
                    Logout
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  style={{ textDecoration: "none" }}
                  className="me-3"
                >
                  <span className="link">Home</span>
                </Link>

                <Link to="/login" className="link">
                  <span className="link">Login</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
