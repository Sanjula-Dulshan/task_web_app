import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../service/Api/Api";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      <h1>{t("login.title")}</h1>
      <div className="login-wrapper">
        <div className="login-form">
          <div className="login-input-item">
            <label>{t("login.email")}</label>
            <input
              type="email"
              name="email"
              value={inputs.email || ""}
              onChange={handleChange}
              placeholder={t("login.email-placeholder")}
            />
          </div>
          <div className="login-input-item">
            <label>{t("login.password")}</label>
            <input
              type="password"
              name="password"
              value={inputs.password || ""}
              onChange={handleChange}
              placeholder={t("login.password-placeholder")}
            />
          </div>
          <div className="login-input-item login-btn-container ">
            <button className="login-btn" onClick={handleLogin}>
              {t("login.login-btn")}{" "}
            </button>
            <p
              style={{
                marginTop: "30px",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              {t("login.sign-up-txt")}
              <Link to="/register" className="sign-up-txt">
                {t("login.sign-up-link")}
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
