import Joi from "joi";
import Task from "../models/Task.model.js";

// Create a new task
export const CreateTask = async (req, res) => {
  //validate user input
  const Schema = Joi.object({
    userId: Joi.string().required(),
    title: Joi.string().min(3).max(30).required(),
    done: Joi.boolean(),
  });

  console.log(req.body);
  const { error } = Schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = new Task({
    userId: req.body.userId,
    title: req.body.title,
    done: req.body.done,
  });

  console.log(task);

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
    // get tasks without __v" field by userID
    const tasks = await Task.find({ userID: req.params.userId }, { __v: 0 });

    res.send(tasks);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Get a single task
export const GetTask = async (req, res) => {
  try {
    // get task without __v" field
    const task = await Task.findById(req.params.id, { __v: 0 });

    if (!task) {
      // Handle the case where the task with the given ID is not found
      return res.status(404).send("Task not found");
    }

    res.send(task);
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
