import express from "express";
import { validate } from "../middlewares/validationMiddleware.js";
import TaskController from "./task.controller.js";
import TaskValidationSchema from "./task.validationSchema.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const taskRoute = express.Router();

// All tasks page (EJS)
taskRoute.get("/tasks-page", isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    // Get tasks directly from the service
    const tasks = await TaskController.getTasksData(userId); 
    res.render("tasks/tasks", { tasks }); // render EJS page
  } catch (err) {
    next(err);
  }
});

// Create task form page (EJS)
taskRoute.get("/create-task-page", isAuthenticated, (req, res) => {
  res.render("tasks/create-task");
});

// Create task (API or EJS form)
taskRoute.post(
  "/create-task",
  validate(TaskValidationSchema.createTaskValidationSchema),
  TaskController.createTask
);

// Get tasks (API)
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
