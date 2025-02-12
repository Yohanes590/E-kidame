const express =require("express")
const cors =require("cors")
require('dotenv').config()
const alluserData = require("./models/account-create")
const mongoose = require("mongoose")
const ApiServer = express()
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const product_data = require("./models/upload-product")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const ordering_page = require("./models/order-page")
const { env } = require("process")
const { ObjectId } = require("mongodb");  
const { AwsInstance } = require("twilio/lib/rest/accounts/v1/credential/aws")
const adminUsername_password = require("./models/admin-model")
const crypto = require("crypto")
const Api = require("twilio/lib/rest/Api")
//app use some extentions
ApiServer.use(cors({
    origin:process.env.ORIGIN_LINK
}))
ApiServer.use(express.urlencoded({extended:false}))
ApiServer.use(express.json())
ApiServer.use(express.static("./product-photos"))
//Acount create process

ApiServer.post("/sign-in",async(req,res)=>{

        try {
            const phone = req.body[0].user_phone;
            const email = req.body[0].user_email;
            const findPhone = await alluserData.findOne({user_phone:phone})
            const findEmail = await alluserData.findOne({user_email:email})
            const normal_Password = req.body[0].user_password;
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(normal_Password,salt)
            const {userData} = req.body;
            const fetchEmail = {
                username:req.body[0].username,
                user_second_name:req.body[0].user_second_name,
                user_last_name:req.body[0].user_last_name,
                user_email:req.body[0].user_email,
                user_password:hashedPassword,
                user_phone:req.body[0].user_phone,
                user_order:[]
            }
            if(!findPhone){
                if(findEmail){
                    res.send({message:"Account Created Already"})
                }else{
                    const setId = {id:1,fetchEmail};
                    const token = jwt.sign(setId,process.env.ACCESS_TOKEN,{expiresIn:"24h"})
                    await alluserData.create(fetchEmail)
                    res.status(200).json({
                        message:200,
                        token:token,
                    })
                }
            }else{
                res.status(200).send({message:400})
            }


        } catch (error) {
            res.status(500).send({
                message:error.message
            })
        }

})


//login 

ApiServer.post("/login" ,async(req,res)=>{
    try {
        const findEmail = req.body[0].email
        const fetchEmail = await alluserData.findOne({user_email:findEmail})

        if(!fetchEmail){
            res.json({status:404})
        }else{
            const findPasskey = req.body[0].password;
            const findPassFromDB = fetchEmail.user_password;
            bcrypt.compare(findPasskey,findPassFromDB,(err,result)=>{
                if(err){
                    res.json({status:404})
                }else if(result){
                    const phoneFinder = req.body[0].phone
                    const phoneFromDB = fetchEmail.user_phone
                    if(phoneFinder != phoneFromDB){
                        res.json({status:404})
                    }else{
                        const setId = {id:1 ,fetchEmail}
                        const loginToken= jwt.sign(setId , process.env.ACCESS_TOKEN,{expiresIn:"24hr"})
                        res.json({status:200,auth_token:loginToken})
                    }
                }else{
                    res.json({status:404})
                }
            })
        }
    } catch (error) {
        res.json({error:error.message})
    }
})


//certified

ApiServer.post("/user-certifcate",(req,res)=>{
  try {
    const cookie = req.body.cookie
    jwt.verify(cookie,process.env.ACCESS_TOKEN,(err,decode)=>{
        if(err){
            res.send({status:404})
        }
        const sendEmail = decode.fetchEmail.user_email
        res.send({email:sendEmail})
    })
  } catch (error) {
    res.send({status:error.message})
  }
})

ApiServer.post("/delete-user-account",async(req,res)=>{
    
    try {
        const user_cookie_id = req.body.cookie
        jwt.verify(user_cookie_id,process.env.ACCESS_TOKEN,async(err,decode)=>{
            if(err){
                res.send({
                    status:404
                })
            }else{
                const find_out_email = decode.fetchEmail.user_email
               const result=  await alluserData.findOneAndDelete({user_email:find_out_email})
                res.send({
                    status:200,
                    email:find_out_email,
                    result:result
                })
            }
        })
    } catch (error) {
        res.send({
            status:404
        })
    }

})

const Product_photo = multer.diskStorage({

    destination:(req,file,cb)=>{
        cb(null,'./product-photos')
    },

    filename:(req,file,cb)=>{
    const ext =  path.extname(file.originalname);
    cb(null,Date.now()+ext)
    }
})

const upload = multer({ storage: Product_photo });  

ApiServer.post("/upload-product",upload.single('product_photo'),async(req,res)=>{
    try {
        const phototPath =req.file ? req.file.path : req.body.product_photo_name;
        const photoName = path.basename(phototPath)
        const productDetails = [{
            product_name:req.body.product_name,
            product_title:req.body.product_title,
            product_price:req.body.product_price,
            product_discription:req.body.product_discription,
            product_photo_name:photoName,
        }]
        await product_data.create(productDetails)

        res.json({message:200})
    } catch (error) {
        res.json({message:error.message})
    }
})


ApiServer.post("/get-product-photo",async(req,res)=>{
    try {
      const allProductData = await product_data.find({})
      res.json(allProductData) 
    } catch (error) {
      res.json({
        message:500
      })
    }
})


ApiServer.post("/deliting-product",async(req,res)=>{

  try {
    const photoFile = path.join(__dirname,`./product-photos/${req.body[0].product_photo}`)
    const result= await product_data.findByIdAndDelete(req.body[0].product_id)
    fs.unlink(photoFile,(err)=>{
       if(err){
        res.json({message:200})
        }else{
        res.json({message:500})
        }
    })
  } catch (error) {
    res.json({message:500})
  }

})

ApiServer.post("/order-products",(req,res)=>{
    try{
        const checking_cookie = req.body[0].userInfo
        const product_name = req.body[0].productInfo.product_name
        const product_photo = req.body[0].productInfo.product_photo_name
        const product_qunantity = req.body[0].qunti
        const product_price = req.body[0].productInfo.product_price 




        jwt.verify(checking_cookie,process.env.ACCESS_TOKEN,async(err,decode)=>{
            if(err){
                res.json({message:500})
            }else{

                const clinet_name =   decode.fetchEmail.username 
                const clinet_email =  decode.fetchEmail.user_email 
                const clint_phone =  decode.fetchEmail.user_phone 

                const orderingDataBase = [{
                    product_name:product_name,
                    product_photo:product_photo,
                    product_qunantity:product_qunantity,
                    product_price:product_price,
                    clinet_name:clinet_name,
                    clinet_email:clinet_email,
                    clint_phone:clint_phone,
                }]
               const orderId= await ordering_page.create(orderingDataBase) 
                const attachemnt = {
                    product_name:product_name,
                    product_photo:product_photo,
                    product_qunantity:product_qunantity,
                    product_price:product_price,
                    order_id:orderId[0]._id
                }
              await alluserData.findOneAndUpdate(
                    {user_email:clinet_email},
                    {$push:{user_order:attachemnt}},
                    {new:true}
                )
                res.json({message:200,data:orderId})

            }
        })
    }catch (error){
        res.json({message:500})
    }
})

ApiServer.post("/userOrder-api",(req,res)=>{
     try{  

        const userCookie_info = req.body.cookie;
        jwt.verify(userCookie_info,process.env.ACCESS_TOKEN,async(err,decode)=>{
            if(err){
                res.json({
                    message:500
                })
            }else{
                const userEmail = decode.fetchEmail.user_email;
                const  userData= await alluserData.findOne({user_email:userEmail})
                res.json(userData)
            }
        })



     }catch(error){
        res.json("Some Thing Is Wrong")
     }
})

ApiServer.post("/delete-orderd-products",async(req,res)=>{
    try{

await ordering_page.findOneAndDelete({_id:req.body.productId})
await alluserData.findOneAndUpdate(
    { user_email: req.body.email },
    { $pull: { user_order: { order_id: new ObjectId(req.body.productId) } } },
    { new: true }
);
        res.json({message:200})
    }catch(error){
        res.json({message:500})
    }
})


ApiServer.post("/user-info",async(req,res)=>{
    try{
        const usersInfo = await alluserData.find({})
        res.json(usersInfo)
    }catch(error){
        res.json({message:500})
    }
})

ApiServer.post("/deleteUserAdmin" ,async(req,res)=>{
    try{
        const userId = req.body.id
    const responce= await  alluserData.findOneAndDelete({_id:new ObjectId(userId)})
        res.json({message:200})

    }catch(error){
        res.json({message:500})
    }
})


ApiServer.post("/conunt-order",async(req,res)=>{
    try {
      const result = await ordering_page.find({})
        res.json(result)
    } catch (error) {
        res.json({message:500})
    }
})


ApiServer.post("/delete-order-admin",async(req,res)=>{
    try {
        const userId = req.body.id;
         await ordering_page.findOneAndDelete({_id:userId})
        res.json({message:200})
    } catch (error) {
        res.json({
            message:500
        })
    }
})

ApiServer.post("/admin-login",async(req,res)=>{
    try{
       const Adminresult= await adminUsername_password.find({})
       const dbPass = Adminresult[0].password
        const dbUsername = Adminresult[0].username
        if(req.body.username == dbUsername){
            await bcrypt.compare(req.body.password,dbPass,(err,result)=>{
                if(err){
                    res.json({message:500})
                }else{
                    
                    const setIdAdmin = {id:1,adminInfo:Adminresult}
                    const someInfo= jwt.sign(setIdAdmin,process.env.ACCESS_TOKEN,{expiresIn:"2hr"})
                    res.json({message:200,cookie:someInfo})
                }
                       })
                
        }else{
            res.json({message:500})
        }

    }catch(error){
        res.json({message:500})
    }
})


ApiServer.post("/check-admin-status",(req,res)=>{
    try {
        jwt.verify(req.body.key,process.env.ACCESS_TOKEN,(err,decode)=>{
            if(err){
            res.json({message:500})
            }else{
             res.json({message:200})
            }
        })  
    } catch (error) {
        res.json({message:500})
    }
})

mongoose.connect("mongodb+srv://jplussince34:TaouDjU2hr6DVzFg@ekidame.smckf.mongodb.net/data?retryWrites=true&w=majority&appName=EKIDAME")
.then(()=>{
    console.log("Database Connect Success")
}).catch((error)=>{
    console.log({message:error.message})
})

ApiServer.listen(process.env.PORT,()=>{
    console.log(`App Start On ${process.env.PORT}`)
})

//TaouDjU2hr6DVzFg
//jplussince34