import TaskService from "./task.service.js";
import ResponseHandler from "../utils/responseHandler.js";

class TaskController {
  // Create task
  static createTask = async (req, res, next) => {
    try {
      const task = await TaskService.createTask(req.body, req.user.id);
      return ResponseHandler.ok(res, "Task created successfully", task);
    } catch (error) {
      next(error);
    }
  };

  // Get tasks (optionally filtered by status)
  static getTasks = async (req, res, next) => {
    try {
      const { status } = req.query;
      const tasks = await TaskService.getUserTasks(req.user.id, status);
      return ResponseHandler.ok(res, "Tasks fetched successfully", tasks);
    } catch (error) {
      next(error);
    }
  };

  // Update task status
  static updateTaskStatus = async (req, res, next) => {
    try {
      const { id } = req.params; 
      const { status } = req.body; 

      if (!["pending", "completed", "deleted"].includes(status)) {
        return ResponseHandler.badRequest(res, "Invalid status value");
      }

      const task = await TaskService.updateTaskStatus(id, req.user.id, status);
      return ResponseHandler.ok(res, "Task status updated", task);
    } catch (error) {
      next(error); 
    }
  };

  // Soft delete task
  static deleteTask = async (req, res, next) => {
    try {
      const { id } = req.params;
      const task = await TaskService.deleteTask(id, req.user.id);
      return ResponseHandler.ok(res, "Task deleted successfully", task);
    } catch (error) {
      next(error); 
    }
  };
}
export default TaskController;
