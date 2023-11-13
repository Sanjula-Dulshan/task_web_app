import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../service/Api/Api";
import { useTranslation } from "react-i18next";
import { ThreeCircles } from "react-loader-spinner";
import { NOTIFICATION_TYPE, notification } from "./common/Notification";

const Login = () => {
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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
      notification(t("alert.error.required"), NOTIFICATION_TYPE.WARNING);
      return false;
    }

    // Validate email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      notification(t("alert.error.email"), NOTIFICATION_TYPE.WARNING);
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateFields()) {
      return;
    }
    setIsLoading(true);
    const response = await login(inputs);

    if (response?.status === 200) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);

      navigate("/home");
    } else {
      notification(response.response.data, NOTIFICATION_TYPE.ERROR);
    }
    setIsLoading(false);
    setInputs({});
  };

  return (
    <div>
      {isLoading ? (
        <ThreeCircles
          height="100"
          width="100"
          color="#ff9900"
          wrapperClass="loader"
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Login;
