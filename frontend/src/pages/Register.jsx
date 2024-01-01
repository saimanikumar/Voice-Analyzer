import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import host from "../hostUrl";
import LoadingSpinner from "./LoadingSpinner";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      await axios.post(`${host}/api/user/register`, inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="auth2">
      <div className="xt" data-aos="zoom-out">
        <form style={{ height: "40em" }} data-aos="zoom-in">
          <h1>REGISTER</h1>

          <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="number"
          placeholder="phone"
          name="phone"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />

          <button onClick={handleSubmit} className="form-btn">
            {loading ? <LoadingSpinner /> : "Register"} 
          </button>
          {err && <p>{err}</p>}
          <span>
            Already a member?{" "}
            <Link
              style={{
                textDecoration: "none",
                color: "#ff9899",
                backgroundColor: "inherit",
              }}
              to="/login"
            >
              Login here
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
