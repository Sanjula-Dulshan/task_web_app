import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../service/Api/Api";

const Register = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const validateFields = () => {
    // Check if required fields are filled
    if (
      !inputs.name ||
      !inputs.email ||
      !inputs.password ||
      !inputs.cPassword
    ) {
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

  const handleSignUp = async () => {
    if (!validateFields()) {
      return;
    }

    //check password and confirm password
    if (inputs.password !== inputs.cPassword) {
      alert("Password and Confirm Password must be same");
      return;
    }

    const { cPassword, ...inputsWithoutCPassword } = inputs;

    const response = await register(inputsWithoutCPassword);

    if (response?.status === 200) {
      alert("User registered successfully");
      setInputs({});
      navigate("/");
    } else {
      alert(response.response.data);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <div className="login-wrapper">
        <div className="login-form">
          <div className="login-input-item">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={inputs.name || ""}
              onChange={handleChange}
              placeholder="Enter your Name"
              required
            />
          </div>
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

          <div className="login-input-item">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="cPassword"
              value={inputs.cPassword || ""}
              onChange={handleChange}
              placeholder="Enter your password again"
            />
          </div>
          <div className="login-input-item login-btn-container ">
            <button className="login-btn" onClick={handleSignUp}>
              Register
            </button>
            <p
              style={{
                marginTop: "30px",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              Already have an account, sign in{" "}
              <Link to="/" className="sign-up-txt">
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

export default Register;
