import React, { useEffect, useState } from "react";
import Task from "./common/Task";
import { getAllTask, updateStatus } from "../service/Api/Api";

export default function Home() {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [allTask, setAllTask] = useState([]);

  const handleAddNewToDo = () => {};

  useEffect(() => {
    try {
      getAllTask()
        .then((res) => {
          console.log(res.data);
          setAllTask(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [isLoading]);

  const handleToDoDelete = (index) => {};

  const handleComplete = async (taskId) => {
    console.log("index", taskId);
    setIsLoading(true);

    try {
      await updateStatus(taskId);
    } catch (error) {
      console.log(error);
    }

    handleToDoDelete(taskId);
    setIsLoading(false);
  };
  return (
    <div>
      <h1>My Task</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title:</label>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="What's the title of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description:</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the description of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            <button
              className="primary-btn"
              type="button"
              onClick={handleAddNewToDo}
            >
              Add
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
            To Do
          </button>
          <button
            className={`secondaryBtn ${isCompletedScreen === true && "active"}`}
            onClick={() => setIsCompletedScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {allTask.map((item, index) => (
            <div key={index}>
              <Task
                item={item}
                handleComplete={handleComplete}
                isCompleted={isCompletedScreen}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
