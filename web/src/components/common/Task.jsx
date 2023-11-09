import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

export default function Task({ title, description }) {
  return (
    <div className="todo-list-item">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div>
        <AiOutlineDelete title="Delete?" className="icon" />
        <BsCheckLg title="Completed?" className=" check-icon" />
      </div>
    </div>
  );
}
