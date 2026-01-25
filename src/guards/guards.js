import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config";

class Guards {
  static hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
  };
  static comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  };
  static createJwt = (user) => {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      config.secret_key,
      { expiresIn: "1d" },
    );
  };
}

export default Guards;
