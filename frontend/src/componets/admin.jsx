import '../styles/admin-style.css'
import { ConstantLink } from './apiLink'
import { toast } from "react-toastify"
import Cookies from 'js-cookie'
import { ToastContainer } from 'react-toastify'
function Admin_function(){
    const requestToLogin =async ()=>{
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        const serverRespond = await fetch(`${ConstantLink}/admin-login`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password:password,
                username:username
            })
        })
        const asAresult =await serverRespond.json()
        if(asAresult.message==200){
            toast.success("Login Success!")
            setTimeout(()=>{
                window.location="/admin-dashboard"
            },600)
            Cookies.set("admin-cookie",asAresult.cookie,{expires:1})
        }else{
            toast.error("Wrong User Name Or Password ")
        }
        
    }
    return(<>

        <div className="login-box">
                

                <div className="box">
                    <h2>Admin Login</h2><br/>

                    <input type="username" id='username' placeholder='User Name'/><br/>
                    <input type="password" id='password' placeholder='Password'/><br/>
                    <button onClick={requestToLogin}>Login</button>
                </div>


        </div>
        <ToastContainer/>
    </>)
}


export default Admin_function