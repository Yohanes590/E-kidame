const mongoose = require("mongoose")
const product_data= mongoose.Schema({
    product_name:{
        type:String,
        required:true,
    },
    product_title:{
        type:String,
        required:true,
    },
    product_price:{
        type:String,
        required:true
    },
    product_discription:{
        type:String,
        required:true,
    },
    product_photo_name:{
        type:String,
        required:true,
    }
})

const save_product_data = mongoose.model("product" , product_data)
module.exports = save_product_data;