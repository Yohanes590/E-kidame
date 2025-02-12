import Cookies from 'js-cookie'
import { ConstantLink } from './apiLink';

export const check_cookie = async()=>{
    

   const token = Cookies.get("auth_token"); 
   if(token == null){
    document.querySelector(".achive").style.display="none"
    document.getElementById("one").style.display="block"
    document.getElementById("three").style.display="block"
    document.getElementById("email2").style.display="none"
    document.querySelector(".account-status-bar2").style.display="none"
   }else{
    document.querySelector(".achive").style.display="flex"
    document.getElementById("one").style.display="none"
    document.getElementById("three").style.display="none"
    document.getElementById("email2").style.display="block"
    document.querySelector(".account-status-bar2").style.display="block"
    const sendingCookie = await fetch(`${ConstantLink}/user-certifcate`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            cookie:token
        })
    })
    const result = await sendingCookie.json()
    document.getElementById("email2").innerText=result.email
    document.getElementById("email3").innerText=result.email
   }

}