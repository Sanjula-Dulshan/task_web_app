import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import moment from "moment";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

export default function Task({
  item,
  handleComplete,
  handleDelete,
  isCompleted,
}) {
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const { t } = useTranslation();

  const isDone = item?.done;

  const confirmDelete = (taskId) => {
    handleDelete(taskId);
    setIsDeleteConfirmationOpen(false);
  };

  return (
    <>
      {!isCompleted && !isDone && (
        <div className="task-list-item">
          <div>
            <h3>{item?.title}</h3>
            <p>{item?.description}</p>
          </div>
          <div>
            <AiOutlineDelete
              title="Delete?"
              className="icon"
              onClick={() => setIsDeleteConfirmationOpen(true)}
            />
            <BsCheckLg
              title="Completed?"
              className="check-icon"
              onClick={() => handleComplete(item?._id)}
            />
          </div>
        </div>
      )}

      {isCompleted && isDone && (
        <div className="task-list-item">
          <div>
            <h3>{item?.title}</h3>
            <p>{item?.description}</p>
            <p>
              {t("task.completed-at")}
              {moment(item?.updatedAt).format("YYYY/MM/DD h:mm A")}
            </p>
          </div>
          <div>
            <AiOutlineDelete
              title="Delete?"
              className="icon"
              onClick={() => setIsDeleteConfirmationOpen(true)}
            />
          </div>
        </div>
      )}

      {isDeleteConfirmationOpen && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this task?</p>
          <button onClick={() => setIsDeleteConfirmationOpen(false)}>
            Cancel
          </button>
          <button onClick={() => confirmDelete(item?._id)}>Confirm</button>
        </div>
      )}
    </>
  );
}

Task.propTypes = {
  item: PropTypes.object.isRequired,
  handleComplete: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool.isRequired,
};
