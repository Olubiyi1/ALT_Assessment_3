import UserService from "./user.service.js";
import AppError from "../errorHandler/AppError.js";

class UserController {

  // Register user
  static registerUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await UserService.registerUser({ email, password });

      // Set session for EJS
      req.session.user = {
        id: user.id,
        email: user.email
      };

      // Redirect to tasks page
      res.redirect("/task/tasks-page");

    } catch (err) {
      next(err);
    }
  };

  // Login user
  static loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { email: userEmail } = await UserService.userLogin({ email, password });

      // Set session for EJS
      req.session.user = {
        id: req.userId, 
        email: userEmail
      };

      // Redirect to tasks page
      res.redirect("/task/tasks-page");

    } catch (err) {
      next(err);
    }
  };
}

export default UserController;
