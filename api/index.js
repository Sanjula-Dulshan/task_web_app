import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import connectDB from "./config/connectDB.js";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

connectDB();

//middlewares
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(
    chalk.blue.bold("[Server]") +
      chalk.white.bold(" : Node server is running on port ") +
      chalk.green.bold(PORT)
  );
});
