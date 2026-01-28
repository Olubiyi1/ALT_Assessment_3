import TaskService from "./task.service.js";
import ResponseHandler from "../utils/responseHandler.js";

class TaskController {

    // EJS helper: only return task array
  static getTasksData = async (userId) => {
    const tasks = await TaskService.getUserTasks(userId);
    return tasks;
  };
  
  static createTask = async (req, res, next) => {
    try {
      const userId = req.session?.user?.id || req.user?.id;
      const task = await TaskService.createTask(req.body, userId);

      // EJS form request
      if (req.headers.accept?.includes("text/html")) {
        return res.redirect("/task/tasks-page");
      }

      // API response
      return ResponseHandler.ok(res, "Task created successfully", task);
    } catch (error) {
      next(error);
    }
  };

  // Get tasks
  static getTasks = async (req, res, next) => {
    try {
      const userId = req.session?.user?.id || req.user?.id;
      const { status } = req.query;
      const tasks = await TaskService.getUserTasks(userId, status);

      // EJS page
      if (req.headers.accept?.includes("text/html")) {
        return res.render("tasks/tasks", { tasks });
      }

      // API response
      return ResponseHandler.ok(res, "Tasks fetched successfully", tasks);
    } catch (error) {
      next(error);
    }
  };

  // Update task status
  static updateTaskStatus = async (req, res, next) => {
    try {
      const userId = req.session?.user?.id || req.user?.id;
      const { id } = req.params;
      const { status } = req.body;

      if (!["pending", "completed", "deleted"].includes(status)) {
        return ResponseHandler.badRequest(res, "Invalid status value");
      }

      const task = await TaskService.updateTaskStatus(id, userId, status);

      return ResponseHandler.ok(res, "Task status updated", task);
    } catch (error) {
      next(error);
    }
  };

  // Soft delete task
  static deleteTask = async (req, res, next) => {
    try {
      const userId = req.session?.user?.id || req.user?.id;
      const { id } = req.params;
      const task = await TaskService.deleteTask(id, userId);

      return ResponseHandler.ok(res, "Task deleted successfully", task);
    } catch (error) {
      next(error);
    }
  };
}

export default TaskController;
