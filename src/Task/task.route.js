import express from "express";
import TaskController from "./task.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const taskRoute = express.Router();

taskRoute.use(isAuthenticated);

taskRoute.get("/tasks-page", async (req, res, next) => {
  try {
    const tasks = await TaskController.getTasksData(req.session.user.id);
    res.render("taskPage", { tasks, user: req.session.user });
  } catch (err) {
    next(err);
  }
});

// Create task
taskRoute.post("/", TaskController.createTask);

// Update task status
taskRoute.post("/update", TaskController.updateTaskStatus);

// Delete task
taskRoute.post("/delete", TaskController.deleteTask);

export default taskRoute;
