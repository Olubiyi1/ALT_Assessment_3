
import UserService from "../services/user.service";
import ResponseHandler from "../utils/responseHandler";

class UserController {

  // REGISTER USER
  static registerUser = async (req, res) => {
    try {
      const user = await UserService.registerUser(req.body);

      return ResponseHandler.success(res, "User registered successfully", user);
    } catch (error) {
      return ResponseHandler.serverError(res, error.message);
    }
  };

  // LOGIN USER
  static loginUser = async (req, res) => {
     try {
      const { email, password } = req.body;
      const user = await UserService.userLogin({ email, password });
      return ResponseHandler.success(res, "Login Successful", user);
    } catch (err) {
      console.error(err);
      return ResponseHandler.unauthorized(res, "Invalid Email or Password");
    }
  };
}

export default UserController;
