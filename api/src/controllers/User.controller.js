import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  // validate user input
  const Schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().required().trim(),
    password: Joi.string().min(8).max(30).required(),
  });

  const { error } = Schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const Login = async (req, res) => {
  // validate user input
  const Schema = Joi.object({
    email: Joi.string().required().trim(),
    password: Joi.string().min(8).max(30).required(),
  });

  const { error } = Schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not found");

  // check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Email or password is wrong");

  // create a token and assign it to the header
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(user._id);
};
