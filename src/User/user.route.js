import express from "express"
import UserController from "./user.controller.js"
import UserValidationSchema from "./validationSchema/user.validation.js"
import { validate } from "../middlewares/validationMiddleware.js"

const userRoute = express.Router()

userRoute.post("/register",validate(UserValidationSchema.createUserValidation),UserController.registerUser)
userRoute.post("/login",validate(UserValidationSchema.userLoginValidation),UserController.loginUser)

export default userRoute;
