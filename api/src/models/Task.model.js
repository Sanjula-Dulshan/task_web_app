import mongoose from "mongoose";
import { Schema } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: (true, "Title is required"),
      min: 3,
      max: 30,
    },

    done: {
      type: Boolean,
      required: (true, "Done is required"),
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);
export default Task;
