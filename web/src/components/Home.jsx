import React, { useEffect, useState } from "react";
import Task from "./common/Task";
import {
  createTask,
  deleteTask,
  getAllTask,
  updateStatus,
} from "../service/Api/Api";
import Header from "./common/Header";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [inputs, setInputs] = useState({});
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allTask, setAllTask] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    setInputs((inputs) => ({ ...inputs, userId: userId }));
    try {
      getAllTask()
        .then((res) => {
          setAllTask(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [isLoading]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const validateFields = () => {
    // Check if required fields are filled
    if (!inputs.title || !inputs.description) {
      alert("All fields are required");
      return false;
    }

    return true;
  };

  const handleAddNewTask = async () => {
    if (!validateFields()) {
      return;
    }
    setIsLoading(true);

    const response = await createTask(inputs);
    if (response?.status === 200) {
      alert("Task added successfully");
      setInputs({});
    } else {
      alert(response.response.data);
    }

    setIsLoading(false);
  };

  const handleDelete = async (taskId) => {
    setIsLoading(true);

    try {
      const response = await deleteTask(taskId);

      if (!response?.status === 200) {
        alert(response.response.data);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const handleComplete = async (taskId) => {
    console.log("index", taskId);
    setIsLoading(true);

    try {
      const response = await updateStatus(taskId);

      if (response?.status === 200) {
        console.log(response.data);
      } else {
        alert(response.response.data);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };
  return (
    <div>
      <Header />
      <h1>{t("task.title")}</h1>

      <div className="task-wrapper">
        <div className="task-input">
          <div className="task-input-item">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={inputs.title || ""}
              onChange={handleChange}
              placeholder="Title of your Task"
            />
          </div>
          <div className="task-input-item">
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={inputs.description || ""}
              onChange={handleChange}
              placeholder="Description of your Task"
            />
          </div>
          <div className="task-input-item">
            <button
              className="primary-btn"
              type="button"
              onClick={handleAddNewTask}
            >
              {t("task.add-new.add-btn")}
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${
              isCompletedScreen === false && "active"
            }`}
            onClick={() => setIsCompletedScreen(false)}
          >
            {t("task.to-do")}
          </button>
          <button
            className={`secondaryBtn ${isCompletedScreen === true && "active"}`}
            onClick={() => setIsCompletedScreen(true)}
          >
            {t("task.completed")}
          </button>
        </div>
        <div className="task-list">
          {allTask.map((item, index) => (
            <div key={index}>
              <Task
                item={item}
                handleComplete={handleComplete}
                handleDelete={handleDelete}
                isCompleted={isCompletedScreen}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
