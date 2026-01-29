import Task from "./task.model.js";
import AppError from "../errorHandler/AppError.js";

class TaskService {
  static createTask = async (data, userId) => {
    const { title, description } = data;
    if (!title || !description) {
      throw new AppError("Title and description are required", 400);
    }
    return await Task.create({ title, description, user: userId, status: "pending" });
  };

  static getUserTasks = async (userId) => {
    if (!userId) throw new AppError("Unauthorized", 401);
    return await Task.find({ user: userId }).sort({ createdAt: -1 });
  };

  static updateTaskStatus = async (taskId, userId, status) => {
    const validStatuses = ["pending", "completed"];
    if (!validStatuses.includes(status)) throw new AppError("Invalid status value", 400);

    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { status },
      { new: true }
    );

    if (!task) throw new AppError("Task not found or unauthorized", 404);
    return task;
  };

  static deleteTask = async (taskId, userId) => {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { status: "deleted" },
      { new: true }
    );

    if (!task) throw new AppError("Task not found or unauthorized", 404);
    return task;
  };
}

export default TaskService;
