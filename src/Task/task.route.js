import express from "express";
import { validate } from "../middlewares/validationMiddleware.js";
import TaskController from "./task.controller.js";
import TaskValidationSchema from "./task.validationSchema.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const taskRoute = express.Router();

//all tasks page
taskRoute.get("/tasks-page", isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const tasks = await TaskController.getTasks(req, res); 
    res.render("tasks/tasks", { tasks });
  } catch (err) {
    next(err);
  }
});

//create task form
taskRoute.get("/create-task-page", isAuthenticated, (req, res) => {
  res.render("tasks/create-task");
});

// Create task
taskRoute.post(
  "/create-task",
  validate(TaskValidationSchema.createTaskValidationSchema),
  TaskController.createTask
);

// Get tasks
taskRoute.get("/tasks", TaskController.getTasks);

// Update task status
taskRoute.patch(
  "/:id",
  validate(TaskValidationSchema.updateTaskStatusValidation),
  TaskController.updateTaskStatus
);

// Delete task
taskRoute.delete("/:id", TaskController.deleteTask);

export default taskRoute;
