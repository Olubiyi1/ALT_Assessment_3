import express, { urlencoded } from "express"
import userRoute from "./User/user.route.js";
import taskRoute from "./Task/task.route.js";
import { notFoundHandler } from "./errorHandler/notFound.js";
import { globalErrorHandler } from "./errorHandler/globalErrorHandler.js";

const app = express()
app.use(express.json())
app.use(urlencoded({extended:true}))

// user route
app.use("/api/users",userRoute)
app.use("/api/tasks",taskRoute)


app.use(notFoundHandler)
app.use(globalErrorHandler)
export default app;