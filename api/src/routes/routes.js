import express from "express";
import { Login, Register } from "../controllers/User.controller.js";
import {
  CreateTask,
  DeleteTask,
  GetTasks,
  UpdateStatus,
} from "../controllers/Task.Controller.js";
import { Auth } from "../middleware/Auth.js";
const router = express.Router();

// User routes
router.post("/register", Register);
router.post("/login", Login);

// Task routes
router.post("/tasks", Auth, CreateTask);
router.get("/tasks/:userId", Auth, GetTasks);
router.put("/tasks/:id", Auth, UpdateStatus);
router.delete("/tasks/:id", Auth, DeleteTask);

export default router;
