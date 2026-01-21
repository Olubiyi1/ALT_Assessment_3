import {connectDb} from "../src/config/db.js"
import app from "./app.js";
import config from "./config/config.js";

app.listen(config.port,()=>{
    console.log("app up and running");
})
connectDb();