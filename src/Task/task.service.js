import TaskService from "./task.service.js";
import ResponseHandler from "../utils/responseHandler.js";

class TaskController {

  // Create task
  static createTask = async (req, res, next) => {
    try {
      const userId = req.session?.user?.id; // for EJS
      const task = await TaskService.createTask(req.body, userId);

      // EJS form request
      if (req.headers.accept?.includes("text/html")) {
        return res.redirect("/task/tasks-page");
      }

      // API response
      return ResponseHandler.success(res, "Task created successfully", task);

    } catch (error) {
      next(error);
    }
  };

  // Get tasks
  static getTasks = async (req, res, next) => {
    try {
      const userId = req.session?.user?.id || req.user?.id; // EJS or API
      const tasks = await TaskService.getUserTasks(userId);

      // EJS page
      if (req.headers.accept?.includes("text/html")) {
        return res.render("tasks/tasks", { tasks });
      }

      // API response
      return ResponseHandler.success(res, "Tasks fetched successfully", tasks);

    } catch (error) {
      next(error);
    }
  };

  // Update task status
  static updateTaskStatus = async (req, res, next) => {
    try {
      const userId = req.session?.user?.id || req.user?.id;
      const { status } = req.body;
      const task = await TaskService.updateTaskStatus(req.params.id, userId, status);

      return ResponseHandler.success(res, "Task updated successfully", task);

    } catch (error) {
      next(error);
    }
  };

  // Delete task
  static deleteTask = async (req, res, next) => {
    try {
      const userId = req.session?.user?.id || req.user?.id;
      const task = await TaskService.deleteTask(req.params.id, userId);

      return ResponseHandler.success(res, "Task deleted successfully", task);

    } catch (error) {
      next(error);
    }
  };
}

export default TaskController;
