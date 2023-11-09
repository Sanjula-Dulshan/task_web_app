import mongoose from "mongoose";
import { Schema } from "mongoose";

const TaskSchema = new Schema(
  {
    userId: {
      type: String,
      required: (true, "User ID is required"),
    },
    title: {
      type: String,
      required: (true, "Title is required"),
      min: 3,
      max: 30,
    },

    done: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);
export default Task;
