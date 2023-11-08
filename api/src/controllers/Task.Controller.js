import Task from "../models/Task.model.js";

export const CreateTask = async (req, res) => {
  // validate user input
  const Schema = joi.object({
    title: joi.string().min(3).max(30).required(),
    done: joi.boolean().required(),
  });

  const { error } = Schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = new Task({
    title: req.body.title,
    done: req.body.done,
  });

  try {
    const savedTask = await task.save();
    res.send(savedTask);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
