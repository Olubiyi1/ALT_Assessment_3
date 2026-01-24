import mongoose from "mongoose"

export const userModel = new mongoose.Schema({

    namr:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    }

},{
    timestamps:true
}
)