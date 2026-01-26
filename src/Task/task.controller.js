import TaskService from "../services/task.service";
import ResponseHandler from "../utils/responseHandler";

class TaskController {
    // create task
    
  static createTask = async (req, res) => {
    try {
      const task = await TaskService.createTask(req.body, req.user.id);
      return ResponseHandler.success(res, "Task created successfully", task);
    } catch (error) {
      return ResponseHandler.serverError(res, error.message);
    }
  };

  // filter task by status
  static getTasks = async (req, res) => {
    try {
      const { status } = req.query;
      const tasks = await TaskService.getUserTasks(req.user.id, status);
      return ResponseHandler.ok(res, "Tasks fetched successfully", tasks);
    } catch (error) {
      return ResponseHandler.serverError(res, error.message);
    }
  };

  static updateTaskStatus = async (req, res) => {
    try {
      const { id } = req.params; 
      const { status } = req.body; 

      if (!["pending", "completed", "deleted"].includes(status)) {
        return ResponseHandler.badRequest(res, "Invalid status value");
      }

      const task = await TaskService.updateTaskStatus(id, req.user.id, status);
      return ResponseHandler.ok(res, "Task status updated", task);
    } catch (error) {
      if (error.message === "Task not found or unauthorized") {
        return ResponseHandler.notFound(res, error.message);
      }
      return ResponseHandler.serverError(res, error.message);
    }
  };

  //soft delete task
  static deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await TaskService.deleteTask(id, req.user.id);
      return ResponseHandler.ok(res, "Task deleted successfully", task);
    } catch (error) {
      if (error.message === "Task not found or unauthorized") {
        return ResponseHandler.notFound(res, error.message);
      }
      return ResponseHandler.serverError(res, error.message);
    }
  };
}

export default TaskController;
