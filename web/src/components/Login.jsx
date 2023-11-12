import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../service/Api/Api";

const Login = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const validateFields = () => {
    // Check if required fields are filled
    if (!inputs.email || !inputs.password) {
      alert("All fields are required");
      return false;
    }

    // Validate email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      alert("Invalid email address");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateFields()) {
      return;
    }

    const response = await login(inputs);

    if (response?.status === 200) {
      console.log(response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);

      navigate("/home");
    } else {
      alert(response.response.data);
    }
    setInputs({});
  };

  return (
    <div>
      <h1>Login</h1>
      <div className="login-wrapper">
        <div className="login-form">
          <div className="login-input-item">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={inputs.email || ""}
              onChange={handleChange}
              placeholder="Enter your Email"
            />
          </div>
          <div className="login-input-item">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={inputs.password || ""}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          <div className="login-input-item login-btn-container ">
            <button className="login-btn" onClick={handleLogin}>
              Login
            </button>
            <p
              style={{
                marginTop: "30px",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              If you haven't an account, sign up{" "}
              <Link to="/register" className="sign-up-txt">
                here
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
