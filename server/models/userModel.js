import mongoose from "mongoose";



const userSchema=new mongoose.Schema({
    fullName:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:String,
    profileImg:String
},{timestamps:true})


const userModel=mongoose.model("User",userSchema);


export default userModel;