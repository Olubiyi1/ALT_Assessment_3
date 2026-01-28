import UserService from "./user.service.js";
import ResponseHandler from "../utils/responseHandler.js";

class UserController {

  static registerUser = async (req, res, next) => {
    try {
      const user = await UserService.registerUser(req.body);

      // If request came from EJS form (not JSON), set session and redirect
      if (req.headers.accept?.includes("text/html")) {
        req.session.user = { id: user.id, email: user.email };
        return res.redirect("/task/tasks-page");
      }

      // Else, API response
      return ResponseHandler.success(res, "User registered successfully", user);

    } catch (error) {
      next(error);
    }
  };

  // LOGIN USER
  static loginUser = async (req, res, next) => {
    try {
      const user = await UserService.userLogin(req.body);

      // If request came from EJS form
      if (req.headers.accept?.includes("text/html")) {
        req.session.user = { id: user.id, email: user.email };
        return res.redirect("/task/tasks-page");
      }

      // Else, API response
      return ResponseHandler.success(res, "Login Successful", user);

    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
