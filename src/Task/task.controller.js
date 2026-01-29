import TaskService from "./task.service.js";

class TaskController {
  static getTasksData = async (userId) => {
    return await TaskService.getUserTasks(userId);
  };

  static createTask = async (req, res, next) => {
    try {
      console.log("Session user:", req.session.user);
    console.log("Form data:", req.body);   
      const userId = req.session.user.id;
      await TaskService.createTask(req.body, userId);
      return res.redirect("/task/tasks-page");
    } catch (err) {
      next(err);
    }
  };

  static updateTaskStatus = async (req, res, next) => {
    try {
      const userId = req.session.user.id;
      const { id, status } = req.body; // status sent from form
      await TaskService.updateTaskStatus(id, userId, status);
      return res.redirect("/task/tasks-page");
    } catch (err) {
      next(err);
    }
  };

  static deleteTask = async (req, res, next) => {
    try {
      const userId = req.session.user.id;
      const { id } = req.body;
      await TaskService.deleteTask(id, userId);
      return res.redirect("/task/tasks-page");
    } catch (err) {
      next(err);
    }
  };
}

export default TaskController;
