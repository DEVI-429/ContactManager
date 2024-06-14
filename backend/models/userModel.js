const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add the user name"],
    },
    email:{
        type:String,
        required:[true,"Please add email"],
        unique:[true,"Email is already taken"],
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    }
},{
    timestamps:true
})

module.exports = mongoose.model("User",userSchema)