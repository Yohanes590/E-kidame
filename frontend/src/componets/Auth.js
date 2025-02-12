import {toast} from 'react-toastify'
import Cookies from 'js-cookie'
import { ConstantLink } from './apiLink';
import { ClintSide_orderApi } from './fetching-product'
export const RigiseterUser = async()=>{
    const firstname = document.getElementById("f-name").value;
    const secondname = document.getElementById("s-name").value;
    const lastname = document.getElementById("l-name").value;
    const email = document.getElementById("email").value;
    const password1 = document.getElementById("password1").value;
    const password2 = document.getElementById("password2").value;
    const phone = document.getElementById("phone").value;
    const empty = ""
    if(firstname == empty){
        toast.error("Please Insert First Name")
    }else if(secondname == empty){
        toast.error("Please Insert Second Name")
    }else if(lastname == empty){
        toast.error("Please Insert Last Name")
    }else if(email == empty){
        toast.error("Please Insert Email Address")
    }else if(password1 == empty){
        toast.error("Please Insert Your Password")
    }else if(password1.length< 8){
        toast.error("Less Than 8Char Not Allowed ")
    }else if(password2 ==empty){
        toast.error("Comfirm Your Passworod Please")
    }else if(password1 != password2){
        toast.error("Not Same Password")
    }else if(phone == empty){
        toast.error("Please Insert Phone Number")
    }else if(phone.length < 10){
        toast.error("Valid Phone Number")
    }else{
        
        const userInfo = [
            {
                username:firstname,
                user_second_name:secondname,
                user_last_name:lastname,
                user_email:email,
                user_password:password1,
                user_phone:phone,
            }
        ]
    
        const SendRequsetForServer = await fetch(`${ConstantLink}/sign-in`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userInfo)
        })
    
        const result = await SendRequsetForServer.json()
        if(result.message == 200){
            toast.success("Account Regiseter Success")
            const set_cookie_token = result.token;
            Cookies.set("auth_token",set_cookie_token,{expires:1})
            window.location.href='/'
        }else if(result.message == 400){
            toast.error("Account Already Created!")
        }else{
            toast.error("Some Thing Went Wrong Refresh Page?")
        }
    }

}


export const LoginUser = async()=>{
    const email = document.getElementById("email").value;
    const password1 = document.getElementById("password").value;
    const phone =document.getElementById("phone").value;
    const empty = ""
    if(email == empty){
        toast.error("Please Insert Email")
    }else if(password1 == empty){
        toast.error("Please Insert Password")
    }else if(phone == empty){
        toast.error("Plase Insert Phone No")
    }else{
        const logindata = [{
            email:email,
            password:password1,
            phone:phone
        }] 
    
    const login_into_server = await fetch(`${ConstantLink}/login`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(logindata)
    })
    const result = await login_into_server.json()
    const SetToken  = result.auth_token;
    if(result.status == 404){
        toast.error("Account Not Found!")
    }else if(result.status == 200){
        toast.success("Login Success")
    Cookies.set('auth_token', `${SetToken}`, { expires: 1 ,secure:true,sameSite:'Strict'}); 
        window.location.href='/'
        }else{
        toast.error("Server Error Refresh Page")
    }
    }
}


export const deleteAccount = async()=>{
   const getUserId = Cookies.get("auth_token")
   if(getUserId == null){
    toast.error("Reload The Page Please!")
    window.location.reload()
   }else if(confirm("Are You Sure Delete This Account")){
    Cookies.remove("auth_token")
    const deleting_request = await fetch(`${ConstantLink}/delete-user-account`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            cookie:getUserId
        })
    })
    const Server_result = await deleting_request.json()
    if(Server_result.status==200){
        toast.warning("account deleted")
        window.location.reload()
    }else{
        toast.error("Some Thing Went Wrong")
    }

   }
}


export const logOut = ()=>{
    Cookies.remove("auth_token")
    window.location.reload()
}



export const Upload_product = async ()=>{

    const product_name = document.getElementById("product-name").value;
    const product_title = document.getElementById("product-title").value;
    const product_price = document.getElementById("product-price").value;
    const product_discription = document.getElementById("product-discription").value;
    const product_photo_name = document.getElementById("photo-file").files[0];
    const formData = new FormData()
    formData.append("product_name", product_name);
    formData.append("product_title", product_title);
    formData.append("product_price", product_price);
    formData.append("product_discription", product_discription);
    formData.append("product_photo", product_photo_name);
    const empty =""

        if(product_name == empty){
            toast.error("Please Insert Product Name")
        }else if(product_title == empty){
            toast.error("Please Insert Product Title")
        }else if(product_price == empty){
            toast.error("Please Insert Product Price")
        }else if(product_discription == empty){
            toast.error("Please Insert Product Discription")
        }else if(product_photo_name == empty){
            toast.error("Please Insert Product Picture")
        }else{
            const upload_on_server = await fetch(`${ConstantLink}/upload-product`,{
                method:"post",
                body:formData,
            })
            const upload_result = await upload_on_server.json()
            if(upload_result.message == 200){
                toast.success("Product Uploaded Success Fully")
                window.location.reload()
            }else{
                toast.error("Some Thing Went Wrong")
                window.location.reload()
            }
        }
}


export const Order_Auth = ()=>{
    const cheack_cookie  = Cookies.get("auth_token")
    if(cheack_cookie == null){
        window.location.href="/"
    }else{
        ClintSide_orderApi()
    }
}