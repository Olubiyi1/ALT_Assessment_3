import express from "express";
import UserController from "./user.controller.js";
import UserValidationSchema from "./validationSchema/user.validation.js";
import { validate } from "../middlewares/validationMiddleware.js";

const userRoute = express.Router();

// register form
userRoute.get("/register", (req, res) => {
  res.render("register");
});

// login form
userRoute.get("/login", (req, res) => {
  res.render("login");
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
userRoute.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    // Clear session cookie
    res.clearCookie("connect.sid"); 
    // Redirect to login page
    res.redirect("/login"); 
  });
})
export default userRoute;
