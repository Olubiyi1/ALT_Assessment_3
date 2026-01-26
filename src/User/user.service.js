import Guards from "../guards/guards";
import userModel from "./user.model";

class UserService {

  static registerUser = async (data) => {
    try {
      const { email, password } = data;

      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await Guards.hashPassword(password);

      const user = await userModel.create({
        email,
        password: hashedPassword
      });

      return user;
    } catch (error) {
      throw error;
    }
  };

  static userLogin = async (data) => {
    try {
      const { email, password } = data;

      const user = await userModel.findOne({ email });
      if (!user) {
        throw new Error("Invalid email or password");
      }

      const isPasswordValid = await Guards.comparePassword(
        password,
        user.password
      );

      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      const token = Guards.createJwt(user);

      return {
        token,
        email: user.email
      };
    } catch (error) {
      throw error;
    }
  };
}

export default UserService;
