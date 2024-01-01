import React from "react";
import { Link } from "react-router-dom"; // import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <>
      <div className="footer text-white text-center pt-5 mt-5">
        Made with React by Sai Mani Kumar Devathi
      </div>
      <div className="col-md-12 d-flex justify-content-center">
        <a
          href="https://www.linkedin.com/in/sai-mani-kumar-devathi/"
          target="_blank"
          className="me-3"
        >
          <i className="bi bi-linkedin text-muted fs-4"></i>
        </a>
        <a
          href="https://github.com/saimanikumar"
          target="_blank"
          className="me-3"
        >
          <i className="bi bi-github text-muted fs-4"></i>
        </a>
        <a
          href="mailto:saimanikumar67@gmail.com"
          target="_blank"
          className="me-3"
        >
          <i className="bi bi-envelope text-muted fs-4"></i>
        </a>
      </div>
    </>
  );
};

export default Footer;
