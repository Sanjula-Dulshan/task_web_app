import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import moment from "moment";

export default function Task({
  item,
  handleComplete,
  handleDelete,
  isCompleted,
}) {
  const isDone = item?.done;

  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const confirmDelete = (taskId) => {
    handleDelete(taskId);
    setDeleteConfirmationOpen(false);
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
              onClick={() => setDeleteConfirmationOpen(true)}
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
              Completed at:
              {moment(item?.updatedAt).format("YYYY/MM/DD h:mm A")}
            </p>
          </div>
          <div>
            <AiOutlineDelete
              title="Delete?"
              className="icon"
              onClick={() => setDeleteConfirmationOpen(true)}
            />
          </div>
        </div>
      )}

      {isDeleteConfirmationOpen && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this task?</p>
          <button onClick={() => setDeleteConfirmationOpen(false)}>
            Cancel
          </button>
          <button onClick={() => confirmDelete(item?._id)}>Confirm</button>
        </div>
      )}
    </>
  );
}
