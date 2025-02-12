import { ConstantLink } from "./apiLink"
import { toast } from "react-toastify"
import Cookies from 'js-cookie'
export const countUsers = async()=>{
    const countingInfo = await fetch(`${ConstantLink}/user-info`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
    })
    const usersResult = await countingInfo.json()
    document.getElementById("userCounter").innerText=`${usersResult.length}`
    usersResult.forEach(userElement =>{
        const td = document.createElement("tr")
        td.innerHTML =`
                                    <tr>
                                        <td>${userElement.username}</td>
                                        <td>${userElement.user_second_name}</td>
                                        <td>${userElement.user_last_name}</td>
                                        <td>${userElement.user_email}</td>
                                        <td>${userElement.user_phone}</td>
                                        <td><button id='detail' class="deleteUser">Delete</button></td>
                                    </tr>
        `
    document.getElementById("users-info").appendChild(td)
    td.querySelector(".deleteUser").addEventListener('click',()=>deleteUser(userElement._id))
})
}

//

const deleteUser = async(userId)=>{
    if(confirm("are you sure delete user")){
        const request = await fetch(`${ConstantLink}/deleteUserAdmin`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:userId
            })
        })
        const serverResopnce = await request.json()
        if(serverResopnce.message==200){
        toast.success("Deleted Success")
        window.location.reload()
        }else{
        toast.warning("Some Thing Went Wrong")
        }
    }
}


export const countOrder = async()=>{
    const orderResult = await fetch(`${ConstantLink}/conunt-order`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        }
    })
    const changeResultToJson = await orderResult.json()
    document.getElementById("order-counter").innerText=`${changeResultToJson.length}`
    changeResultToJson.forEach(indexElement=>{
        const tableElement = document.createElement('tr')
        tableElement.innerHTML=`

                    <td>${indexElement.clinet_name}</td>
                    <td>${indexElement.clinet_email}</td>
                    <td>${indexElement.clint_phone}</td>
                    <td>${indexElement.product_name}</td>
                    <td>${indexElement.product_qunantity}</td>
                    <td><a href="${ConstantLink}/${indexElement.product_photo}">Product Image</a></td>
                    <td><button id='detail' class="deleteOrder">Delete</button></td>
        
        `
        tableElement.querySelector(".deleteOrder").addEventListener('click',()=>deleteAdminOrder(indexElement._id))
        document.getElementById("order-data").appendChild(tableElement)
    })

}


 const deleteAdminOrder = async(id,email)=>{
            if(confirm("Are you sure to delete")){
                const sendToServer = await fetch(`${ConstantLink}/delete-order-admin`,{
                    method:"post",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        id:id,
                    })
                })
                const ServerResult = await sendToServer.json()
                if(ServerResult.message == 200){
                    toast.warning("Delete Success !")
                    setTimeout(()=>{
                        window.location.reload()
                    },500)
                }
            }else{
                toast.success("Process Cancel")
            }
}

export const adminCertify  = async ()=>{
    const cookieInformation = Cookies.get("admin-cookie")
    const sendCookie = await fetch(`${ConstantLink}/check-admin-status`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            key:cookieInformation
        })
    })

    const certifcate = await sendCookie.json()
    console.log(certifcate)
    if(certifcate.message== 200){
        toast.success("Admin Dashboard")
    }else{
        toast.error("Some Thing Went Wrong")
        window.location.href="/"
    }
}