import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import dbInstance from "./config/connectDB.js";
import UserRoutes from "./src/routes/routes.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

//middlewares
app.use(cors());
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, auth-token"
  );
  next();
});

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/api", UserRoutes);

app.listen(PORT, () => {
  console.log(
    chalk.blue.bold("[Server]") +
      chalk.white.bold(" : Node server is running on port ") +
      chalk.green.bold(PORT)
  );
});
