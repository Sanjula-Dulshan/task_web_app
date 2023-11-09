import mongoose from "mongoose";
import chalk from "chalk";
import dotenv from "dotenv";
dotenv.config();

// Make the DB connection a singleton
class DatabaseSingleton {
  constructor() {
    if (!DatabaseSingleton.instance) {
      this.connect();
      DatabaseSingleton.instance = this;
    }
    return DatabaseSingleton.instance;
  }

  async connect() {
    try {
      await mongoose.connect(process.env.DATABASE);
      console.log(
        chalk.blue.bold("[Server]") +
          " : " +
          chalk.yellow.bold("MongoDB") +
          chalk.green.bold(" Connected...")
      );
    } catch (err) {
      console.log(
        chalk.blue.bold("[Server]") +
          chalk.white.bold(" : ") +
          chalk.red.bold("MongoDB connection Failed...") +
          " " +
          chalk.white.bold(err.message)
      );
      process.exit();
    }
  }
}

const dbInstance = new DatabaseSingleton();
export default dbInstance;
