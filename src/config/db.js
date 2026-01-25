import config from "./config.js";
import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(config.mongo_uri);
    console.log("connection to db successful");
  } catch (error) {
    console.log("failed to connect db");
    console.error(error);
    
    process.exit(1);
  }
};

