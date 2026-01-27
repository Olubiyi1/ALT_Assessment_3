import Task from "./task.model.js";
import AppError from "../errorHandler/AppError.js";

class TaskService {

  // Task creation
  static createTask = async (data, userId) => {
    const { title, description } = data;

    if (!title || !description) {
      throw new AppError("Title and description are required", 400);
    }

    const task = await Task.create({
      title,
      description,
      user: userId,
      status: "active", // optional default
    });

    return task;
  };

  // Get all tasks for a single user
  static getUserTasks = async (userId, status = null) => {
    const query = { user: userId };
    if (status) query.status = status;

    return await Task.find(query).sort({ createdAt: -1 });
  };

  // Update task status
  static updateTaskStatus = async (taskId, userId, status) => {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { status },
      { new: true }
    );

    if (!task) {
      throw new AppError("Task not found or unauthorized", 404);
    }

    return task;
  };

  // Soft delete for task
  static deleteTask = async (taskId, userId) => {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { status: "deleted" },
      { new: true }
    );

    if (!task) {
      throw new AppError("Task not found or unauthorized", 404);
    }

    return task;
  };
}

export default TaskService;
