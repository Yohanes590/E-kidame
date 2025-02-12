const mongoose = require("mongoose")
const account_creation = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    user_second_name:{
        type:String,
        required:true,
    },
    user_last_name:{
        type:String,
        requried:true,
    },
    user_email:{
        type:String,
        requried:true
    },
    user_password:{
        type:String,
        requried:true
    },
    user_phone:{
        type:String,
        required:true
    },
    user_order:{
        type:Array,
        required:true
    }
})

const alluserData = mongoose.model("userdata" , account_creation);
module.exports =alluserData;