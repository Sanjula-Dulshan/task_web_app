import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../service/Api/Api";
import { useTranslation } from "react-i18next";

const Register = () => {
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
    if (
      !inputs.name ||
      !inputs.email ||
      !inputs.password ||
      !inputs.cPassword
    ) {
      alert(t("alert.error.required"));
      return false;
    }

    // Validate email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      alert(t("alert.error.email"));
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
      alert(t("alert.error.confirm-password"));
      return;
    }

    const { cPassword, ...inputsWithoutCPassword } = inputs;

    const response = await register(inputsWithoutCPassword);

    if (response?.status === 200) {
      alert(t("alert.success.user-register"));
      setInputs({});
      navigate("/");
    } else {
      alert(response.response.data);
    }
  };

  return (
    <div>
      <h1>{t("sign-up.title")}</h1>
      <div className="login-wrapper">
        <div className="login-form">
          <div className="login-input-item">
            <label>{t("sign-up.name")}</label>
            <input
              type="text"
              name="name"
              value={inputs.name || ""}
              onChange={handleChange}
              placeholder={t("sign-up.name-placeholder")}
              required
            />
          </div>
          <div className="login-input-item">
            <label>{t("sign-up.email")}</label>
            <input
              type="email"
              name="email"
              value={inputs.email || ""}
              onChange={handleChange}
              placeholder={t("sign-up.email-placeholder")}
            />
          </div>
          <div className="login-input-item">
            <label>{t("sign-up.password")}</label>
            <input
              type="password"
              name="password"
              value={inputs.password || ""}
              onChange={handleChange}
              placeholder={t("sign-up.password-placeholder")}
            />
          </div>

          <div className="login-input-item">
            <label>{t("sign-up.confirm-password")}</label>
            <input
              type="password"
              name="cPassword"
              value={inputs.cPassword || ""}
              onChange={handleChange}
              placeholder={t("sign-up.confirm-password-placeholder")}
            />
          </div>
          <div className="login-input-item login-btn-container ">
            <button className="login-btn" onClick={handleSignUp}>
              {t("sign-up.sign-up-btn")}
            </button>
            <p
              style={{
                marginTop: "30px",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              {t("sign-up.login-txt")}
              <Link to="/" className="sign-up-txt">
                {t("sign-up.login-link")}
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
