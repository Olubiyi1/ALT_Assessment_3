import express from "express";
import { validate } from "../middlewares/validationMiddleware.js";
import TaskController from "./task.controller.js";
import TaskValidationSchema from "./task.validationSchema.js";

const taskRoute = express.Router();

taskRoute.post("/create-task",validate(TaskValidationSchema.createTaskValidationSchema),TaskController.createTask);
taskRoute.get("/tasks", TaskController.getTasks);
taskRoute.patch("/:id",validate(TaskValidationSchema.updateTaskStatusValidation),TaskController.updateTaskStatus);
taskRoute.delete("/:id", TaskController.deleteTask);

export default taskRoute;
