import Task from "./task.model";

class TaskService {

  // task creation
  static createTask = async (data, userId) => {
    try {
      const { title, description } = data;

      const task = await Task.create({
        title,
        description,
        user: userId
      });

      return task;
    } catch (error) {
      throw error;
    }
  };

  // get all task for a single user
  static getUserTasks = async (userId, status = null) => {
    try {
      const query = { user: userId };

      if (status) {
        query.status = status;
      }

      return await Task.find(query).sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  };

  // update task status
  static updateTaskStatus = async (taskId, userId, status) => {
    try {
      const task = await Task.findOneAndUpdate(
        { _id: taskId, user: userId },
        { status },
        { new: true }
      );

      if (!task) {
        throw new Error("Task not found or unauthorized");
      }

      return task;
    } catch (error) {
      throw error;
    }
  };

  // soft delete for task
  static deleteTask = async (taskId, userId) => {
    try {
      return await this.updateTaskStatus(taskId, userId, "deleted");
    } catch (error) {
      throw error;
    }
  };
}

export default TaskService;
