import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

export default function Task({ item, handleComplete, isCompleted }) {
  console.log(isCompleted);
  return !isCompleted ? (
    <>
      {!item?.done ? (
        <div className="todo-list-item">
          <div>
            <h3>{item?.title}</h3>
            <p>{item?.description}</p>
          </div>
          <div>
            <AiOutlineDelete title="Delete?" className="icon" />
            <BsCheckLg
              title="Completed?"
              className=" check-icon"
              onClick={() => handleComplete(item._id)}
            />
          </div>
        </div>
      ) : null}
    </>
  ) : (
    <>
      {item?.done ? (
        <div className="todo-list-item">
          <div>
            <h3>{item?.title}</h3>
            <p>{item?.description}</p>
            <p>Completed at: {item?.updatedAt} </p>
          </div>
          <div>
            <AiOutlineDelete title="Delete?" className="icon" />
          </div>
        </div>
      ) : null}
    </>
  );
}
