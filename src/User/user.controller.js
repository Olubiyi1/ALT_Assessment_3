import UserService from "./user.service.js";
import ResponseHandler from "../utils/responseHandler.js";

class UserController {

  // REGISTER USER
  static registerUser = async (req, res,next) => {
    try {
      const user = await UserService.registerUser(req.body);

      return ResponseHandler.success(res, "User registered successfully", user);
    } catch (error) {
     next(error)
    }
  };

  // LOGIN USER
  static loginUser = async (req, res,next) => {
     try {
      const { email, password } = req.body;
      const user = await UserService.userLogin({ email, password });
      return ResponseHandler.success(res, "Login Successful", user);
    } catch (error) {
      next (error)
    }
  };
}

export default UserController;
