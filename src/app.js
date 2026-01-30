import express, { urlencoded } from "express"
import userRoute from "./User/user.route.js";
import taskRoute from "./Task/task.route.js";
import { notFoundHandler } from "./errorHandler/notFound.js";
import { globalErrorHandler } from "./errorHandler/globalErrorHandler.js";
import session from "express-session";
import path from "path"
import { fileURLToPath } from "url"
import config from "./config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(session({
  secret: config.secret_super_key,
  resave: false,
  saveUninitialized: false,
}));


// user route
app.use("/api/users",userRoute)
app.use("/api/tasks",taskRoute)
app.get("/", (req, res) => {
  const name = req.session.user?.email || "Guest";
  res.render("index", { name });
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.use(notFoundHandler)
app.use(globalErrorHandler)
export default app;