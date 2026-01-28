import Task from "./task.model.js";
import AppError from "../errorHandler/AppError.js";

class TaskService {

  // Create a new task
  static createTask = async (data, userId) => {
    const { title, description } = data;

    // Validate input
    if (!title || !description) {
      throw new AppError("Title and description are required", 400);
    }

    // Create task
    const task = await Task.create({
      title,
      description,
      user: userId,
      status: "active", // default status
    });

    return task;
  };

  // Get all tasks for a user 
  static getUserTasks = async (userId, status = null) => {
    if (!userId) throw new AppError("Unauthorized: User ID is required", 401);

    const query = { user: userId };
    if (status) query.status = status;

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    return tasks;
  };

  // Update task status
  static updateTaskStatus = async (taskId, userId, status) => {
    if (!userId) throw new AppError("Unauthorized: User ID is required", 401);

    const validStatuses = ["active", "pending", "completed", "deleted"];
    if (!validStatuses.includes(status)) {
      throw new AppError("Invalid status value", 400);
    }

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

  // Soft delete a task
  static deleteTask = async (taskId, userId) => {
    if (!userId) throw new AppError("Unauthorized: User ID is required", 401);

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
