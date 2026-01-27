import jwt from "jsonwebtoken";
import config from "../config/config";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) throw new Error("Unauthorized");

    const decoded = jwt.verify(token, config.secret_key);
    req.user = { id: decoded.id, email: decoded.email };

    next();
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }
};

export default authMiddleware;
