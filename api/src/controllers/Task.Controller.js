import Joi from "joi";
import Task from "../models/Task.model.js";

// Create a new task
export const CreateTask = async (req, res) => {
  //validate user input
  const Schema = Joi.object({
    userId: Joi.string().required(),
    title: Joi.string().min(3).max(30).required(),
    description: Joi.string().required(),
    done: Joi.boolean(),
  });

  const { error } = Schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = new Task({
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    done: req.body.done,
  });

  try {
    const savedTask = await task.save();
    res.send(savedTask);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Get all tasks
export const GetTasks = async (req, res) => {
  try {
    const tasks = await Task.find(
      { userId: req.params.userId },
      { __v: 0 }
    ).sort({ updatedAt: -1 });

    res.send(tasks);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Update task status
export const UpdateStatus = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: { done: true } },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).send("Task not found");
    }

    res.send(updatedTask);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Delete a task
export const DeleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).send("Task not found");
    }

    res.send(deletedTask);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
