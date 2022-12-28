const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    userName:{
        type:String,
        required:true,

    },
    last_logged_in:{
        type:Date,
        default:Date.now
    }
})

const Register=mongoose.model("USER",userSchema);

module.exports=Register;