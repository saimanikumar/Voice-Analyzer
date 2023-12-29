import React from 'react';
import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <div className='footer text-white text-center py-5'>
      Made with React by Sai Mani Kumar Devathi
      <Link to="/" className="ms-2  text-white">
      <span className="link">Home?</span>
      </Link>
    </div>
  );
}

export default Footer;
