// import TaskService from "./task.service.js";

// class TaskController {
//   static getTasksData = async (userId) => {
//     return await TaskService.getUserTasks(userId);
//   };

//   static createTask = async (req, res, next) => {
//     try {
//       console.log("Session user:", req.session.user);
//     console.log("Form data:", req.body);   
//       const userId = req.session.user.id;
//       await TaskService.createTask(req.body, userId);
//       return res.redirect("/task/tasks-page");
//     } catch (err) {
//       next(err);
//     }
//   };

//   static updateTaskStatus = async (req, res, next) => {
//     try {
//       const userId = req.session.user.id;
//       const { id, status } = req.body; // status sent from form
//       await TaskService.updateTaskStatus(id, userId, status);
//       return res.redirect("/task/tasks-page");
//     } catch (err) {
//       next(err);
//     }
//   };

//   static deleteTask = async (req, res, next) => {
//     try {
//       const userId = req.session.user.id;
//       const { id } = req.body;
//       await TaskService.deleteTask(id, userId);
//       return res.redirect("/task/tasks-page");
//     } catch (err) {
//       next(err);
//     }
//   };
// }

// export default TaskController;


import TaskService from "./task.service.js";

class TaskController {
  // Get tasks for rendering EJS page
  static getTasksData = async (userId) => {
    return await TaskService.getUserTasks(userId);
  };

  // Create a new task
  static createTask = async (req, res) => {
    try {
      const userId = req.session.user.id;
      await TaskService.createTask(req.body, userId);
      res.redirect("/task/tasks-page");
    } catch (err) {
      console.error(err.message);
      res.status(400).send(err.message);
    }
  };

  // Get tasks (API or EJS)
  static getTasks = async (req, res) => {
    try {
      const userId = req.session.user.id;
      const { status } = req.query;
      const tasks = await TaskService.getUserTasks(userId, status);

      // Render EJS page
      if (req.headers.accept?.includes("text/html")) {
        return res.render("taskPage", { tasks, user: req.session.user });
      }

      // API response
      res.status(200).json({ status: "success", data: tasks });
    } catch (err) {
      console.error(err.message);
      res.status(400).send(err.message);
    }
  };

  // Update task status
  static updateTaskStatus = async (req, res) => {
    try {
      const userId = req.session.user.id;
      const { id, status } = req.body;

      await TaskService.updateTaskStatus(id, userId, status);
      res.redirect("/task/tasks-page");
    } catch (err) {
      console.error(err.message);
      res.status(400).send(err.message);
    }
  };

  // Delete task
  static deleteTask = async (req, res) => {
    try {
      const userId = req.session.user.id;
      const { id } = req.body;

      await TaskService.deleteTask(id, userId);
      res.redirect("/task/tasks-page");
    } catch (err) {
      console.error(err.message);
      res.status(400).send(err.message);
    }
  };
}

export default TaskController;
