import React from "react";

const About = () => {
  return (
    <div className="container-fluid about-page ">
      <div className="container py-3">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="display-6 py-2">
              Unlock the Power of Your Voice
              <br />
              with Voice Analyzer
            </h1>
            <p className="lead text-muted">
              Gain insights into your communication patterns and uncover hidden
              language patterns through the power of speech analysis.
            </p>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-md-6">
            <h2 className="mb-3">Key Features</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Speech-to-text transcription with multilingual translation
              </li>
              <li className="list-group-item">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Personalized speech history and word frequency analysis
              </li>
              <li className="list-group-item">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Top phrase identification and optional speech similarity
                detection
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <h2 className="mb-3">Technology Stack</h2>
            <p className="text-muted">
              Built with React, Node.js, MongoDB, and cutting-edge speech
              recognition, translation, and NLP technologies.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h2 className="mb-4">About Me</h2>
            <p className="text-muted">
              Hi, I'm Sai Mani Kumar Devathi! As an autodidact and technology
              enthusiast based in Guntur, I'm driven by a passion for exploring
              and mastering various technologies.
            </p>
            <p className="text-muted">
              I'm always eager to collaborate with others on exciting projects,
              so feel free to reach out if you have any ideas or just want to
              chat!
            </p>
          </div>
          <div className="col-md-6 text-muted">
            <p>
              This is my repo link:&nbsp;&nbsp;
              <a
                href="https://github.com/saimanikumar/Voice-Analyzer"
                target="_blank"
              >
                <i className="bi bi-github" />
              </a>
              &nbsp;&nbsp;&nbsp; This is my documentation link:&nbsp;&nbsp;
              <a href="#" target="_blank">
                <i className="bi bi-book" />
              </a>
            </p>
          </div>
          <div className="col-md-12 d-flex justify-content-center py-3">
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
        </div>
      </div>
    </div>
  );
};

export default About;
