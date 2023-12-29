import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [input, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      await login(input);
      navigate("/user/dashboard");
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="auth2">
      <div className="xt" data-aos="zoom-out">
        <form data-aos="zoom-in">
          <h1>LOGIN</h1>
          <input
            required
            type="email"
            placeholder="email"
            name="email"
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
            {loading ? "Loading..." : "Login"} 
          </button>
          {err && <p>{err}</p>}
          <span>
            New member?{" "}
            <Link
              style={{ textDecoration: "none", color: "#ff9899" }}
              to="/register"
            >
              Register
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
