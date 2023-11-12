import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import language_en from "./translations/en.json";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";

i18n.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      translation: language_en,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
