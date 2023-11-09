import "./App.css";

import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation("global");
  return (
    <div className="App">
      <h1>{t("task.new")}</h1>
    </div>
  );
}

export default App;
