const mongoose = require('mongoose')
const ordering_page = mongoose.Schema({
    product_name:{
        type:String,
        required:true
    },
    product_photo:{
        type:String,
        required:true,
    },
    product_qunantity:{
        type:String,
        required:true,
    },
    product_price:{
        type:String,
        required:true
    },
    clinet_name:{
        type:String,
        required:true,
    },
    clinet_email:{
        type:String,
        required:true
    },
    clint_phone:{
        type:String,
        required:true
    }
})

const ordering_data = mongoose.model("orders-data",ordering_page)
module.exports = ordering_data