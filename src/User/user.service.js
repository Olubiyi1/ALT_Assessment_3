import Guards from "../guards/guards.js";
import userModel from "../User/user.model.js"
import AppError from "../errorHandler/AppError.js"

class UserService {

  static registerUser = async ({ email, password }) => {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) throw new AppError("User already exists", 400);

    const hashedPassword = await Guards.hashPassword(password);
    const user = await userModel.create({ email, password: hashedPassword });

    return {
      id: user._id,
      email: user.email,
      createdAt: user.createdAt
    };
  };

  static userLogin = async ({ email, password }) => {
    const user = await userModel.findOne({ email });
    if (!user) throw new AppError("Invalid email or password", 401);

    const isPasswordValid = await Guards.comparePassword(password, user.password);
    if (!isPasswordValid) throw new AppError("Invalid email or password", 401);

    return {
      id: user._id,
      email: user.email,
    };
  };
}

export default UserService;
