import mongoose from "mongoose"

const taskModel = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String
    },
    status:{
        type:String,
        enum:["pending","completed","deleted"],
        default:"pending"
    },
    user:{
        // references individual user using their id
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},
{
    timestamps:true
})
export default mongoose.model("Task",taskModel)