const mongoose = require("mongoose")
const adminModel = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})
const adminUsername_password = mongoose.model("admin-username-password", adminModel)
module.exports = adminUsername_password