import express from "express";
import UserController from "./user.controller.js";
import UserValidationSchema from "./validationSchema/user.validation.js";
import { validate } from "../middlewares/validationMiddleware.js";

const userRoute = express.Router();

// register form
userRoute.get("/register-page", (req, res) => {
  res.render("auth/register");
});

// login form
userRoute.get("/login-page", (req, res) => {
  res.render("auth/login");
});

// Logout
userRoute.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/user/login-page");
  });
});

// user registration
userRoute.post(
  "/register",
  validate(UserValidationSchema.createUserValidation),
  UserController.registerUser
);

// user login
userRoute.post(
  "/login",
  validate(UserValidationSchema.userLoginValidation),
  UserController.loginUser
);

export default userRoute;
