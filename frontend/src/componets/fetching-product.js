import { ConstantLink } from "./apiLink"
import { toast } from "react-toastify"
import Cookies from 'js-cookie'

    export const fetchProductDetails = async()=>{

            const fetching_data = await fetch(`${ConstantLink}/get-product-photo`,{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
            })


        //FETCHING DATA ANLITICS AND SOME OTHER API INTEGRATION 
            const fetchData_resultt =await fetching_data.json()
            for(let index in fetchData_resultt){
            const create_div = document.createElement("div")
            create_div.className="each-product"
            create_div.innerHTML=`
                                <img src="${ConstantLink}/${fetchData_resultt[index].product_photo_name}" />
                                <h2>${fetchData_resultt[index].product_name}</h2>
                                <h3>${fetchData_resultt[index].product_title}</h3>
                                <p>${fetchData_resultt[index].product_price}</p>
                                <p>${fetchData_resultt[index].product_discription}</p><br/>
                                <button id='detail' class="delete-btn">Delete</button>
            `
            document.getElementById("product-details").appendChild(create_div)
            create_div.querySelector(".delete-btn").addEventListener('click',()=>deleting_Product(
                fetchData_resultt[index].product_photo_name,
                fetchData_resultt[index]._id
            ))
            }

    }

    //DELETING PRODUCTS FORM CLINT SIDE AND FORM BACKEND SERVER 


    export const deleting_Product = async(product_photo,id)=>{
       const product_info = [{
        product_photo:product_photo,
        product_id:id
       }]
       const serverResponce = await fetch(`${ConstantLink}/deliting-product`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(product_info)
       })
       const result = await serverResponce.json()
       if(result.message == 200){
        toast.warning("product deleted success")
        window.location.reload()
       }else{
        toast.error("Some Thing Went Wrong")
        window.location.reload()
       }
    }   
    // CLINT SIDE FUNCTION - AND FETCHING DATA SERVICE
    export const clintSide_Product = async()=>{
        const fetch_clint_side_project = await fetch(`${ConstantLink}/get-product-photo`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
        })
        const server_result = await fetch_clint_side_project.json()
        server_result.forEach(index_element=>{
            const card = document.createElement("div")
            card.className="card"
            card.innerHTML=`            
<div className="card">
    <img src="${ConstantLink}/${index_element.product_photo_name}"  /> 
<h2>${index_element.product_name}</h2>
<h3>${index_element.product_title}</h3>
<p>${index_element.product_price}</p>
<div className="star">
    <box-icon type='solid' name='star' color="orange"></box-icon>
    <box-icon type='solid' name='star' color="orange"></box-icon>
    <box-icon type='solid' name='star' color="orange"></box-icon>
    <box-icon type='solid' name='star' color="orange"></box-icon>
</div>
<button class='order-now-button' id='order'>Order Now</button>
<button class='details-btn' id='detail'>Details</button>
</div>        `
document.getElementById("prodact-details").appendChild(card)
card.querySelector(".order-now-button").addEventListener('click',()=>detail(index_element))
card.querySelector(".details-btn").addEventListener('click',()=>detail(index_element))
        })
    }

    const detail = (detail)=>{
        const cheack_cookie = Cookies.get("auth_token")
        if(cheack_cookie == null){
            toast.warning("Please Login Or Create Account!")
        }else{
            document.querySelector(".details-page").style.display="flex"
            document.querySelector(".prodact-details").style.display="none"
            document.querySelector(".product-discription").innerHTML=`
                            <h1>${detail.product_name}</h1>
                            <h2>${detail.product_title}</h2>
                            <p>${detail.product_discription}</p>
                            <p>Price : <span>${detail.product_price}</span></p>
                            <p>Quantity: <input type="number" id="number-of-order" placeholder='Number' /></p>
                            <div className="line"></div>
                            <button id='order' class='order-product-page'>Order Now</button>
                            <button id='detail' class='cancel-btn'>Cancel</button>
            `
    
            document.querySelector(".product-photo").innerHTML=`
                        <img src="${ConstantLink}/${detail.product_photo_name}" alt="" />
            `
            document.querySelector(".order-product-page").addEventListener('click',()=>order_product(detail))
            document.querySelector(".cancel-btn").addEventListener('click',()=>cancel(detail))
        }
       
    }

    const cancel = ()=>{
        document.querySelector(".details-page").style.display="none"
        document.querySelector(".prodact-details").style.display="flex"
    }

    // PRODUCT SERVICE FUNCTION 

   async function order_product  (detail){
        const userInfo = Cookies.get("auth_token")
        const qunti = document.getElementById("number-of-order").value
        const all_Info = [
        {
            productInfo:detail,
            userInfo:userInfo,
            qunti:qunti,
        }
    ]
    if (qunti == ""){
        toast.error("Insert quantity please")
    }else{
        const order_into_server = await fetch(`${ConstantLink}/order-products`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(all_Info)
           })
      const server_respond=  await order_into_server.json()
      if(server_respond.message == 200){
        toast.success("Orderd Success Fully")
        setTimeout(()=>{
        window.location.href="/order"
        },500)
      }else{
        toast.error("Something is wrong")
        Cookies.remove("auth_token")
        window.location.reload()
      }
    }

 
    }

  export  const searchProducts =async()=>{
        const searchFromDB = await fetch(`${ConstantLink}/get-product-photo`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            }
        })  
        const queryResult = await  searchFromDB.json()    
     const searchInput= document.getElementById("search-input").value;
        
     const FilterdProducts = queryResult.filter(product => product.product_name.toLowerCase().includes(searchInput.toLowerCase()));
        if(FilterdProducts.length===0){
        toast.warning("No Product Found!")
     }else{
        document.querySelector(".prodact-details").innerHTML=``
     FilterdProducts.forEach(indexElement =>{
       const SearchCard = document.createElement("card")
       SearchCard.className="card"
       SearchCard.innerHTML=`
       
       <div className="card">
    <img src="${ConstantLink}/${indexElement.product_photo_name}"  /> 
<h2>${indexElement.product_name}</h2>
<h3>${indexElement.product_title}</h3>
<p>${indexElement.product_price}</p>
<div className="star">
    <box-icon type='solid' name='star' color="orange"></box-icon>
    <box-icon type='solid' name='star' color="orange"></box-icon>
    <box-icon type='solid' name='star' color="orange"></box-icon>
    <box-icon type='solid' name='star' color="orange"></box-icon>
</div>
<button class='order-now-button' id='order'>Order Now</button>
<button class='details-btn' id='detail'>Details</button>
</div>  
       
       `
     document.getElementById("prodact-details").appendChild(SearchCard)
     SearchCard.querySelector(".order-now-button").addEventListener('click',()=>detail(indexElement))
     SearchCard.querySelector(".details-btn").addEventListener('click',()=>detail(indexElement))
     })
     }

    }



// fetch clint side order


export const ClintSide_orderApi = async()=>{
    const findAuth = Cookies.get("auth_token")
    const sendUserCookie = await fetch(`${ConstantLink}/userOrder-api`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            cookie:findAuth
        })
    })
    const get_user_info = await sendUserCookie.json()
    const fetchOutOrder = get_user_info.user_order
    fetchOutOrder.forEach(order=>{

        const div = document.createElement("div")
        div.className="div"
        div.innerHTML=`
        
        <div className="div">
                    <h2>Attachment</h2><br/>
                    <span>User Email: <label id='black'>${get_user_info.user_email}</label></span> <br/>
                    <span>User Phone Number: <label id='black'>${get_user_info.user_phone}</label></span><br/>
                    <div className="line"></div><br/>
                    <h3>Ordering Details:</h3>
                   <span><br/>Product Name: <label id='black'>${order.product_name}</label></span> 
                   <span><br/>Product Quantity: <label id='black'>${order.product_qunantity}</label></span>
                   <span><br/>Product Price: <label id='black'>${parseInt(order.product_price)*parseInt(order.product_qunantity)}$</label></span><br/>
                   <span><br/><img src="${ConstantLink}/${order.product_photo}"/></span>

                   <button id='detail' class="delete-product-btn">Delete</button>
                </div>
        `

        div.querySelector(".delete-product-btn").addEventListener('click',()=>deleteProduct(order.order_id,get_user_info.user_email))
        document.getElementById("order-table").appendChild(div)
    })

}


const deleteProduct = async(id,email)=>{
    if(confirm("Are you sure to delete order?")){
        const sendDeletedInfo = await fetch(`${ConstantLink}/delete-orderd-products`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                productId:id
            })
        })
        const resultUpdate = await sendDeletedInfo.json()
        console.log(resultUpdate)
        if(resultUpdate.message == 200){
            toast.warning("order delete success")
            setTimeout(()=>{
                window.location.reload()
            },500)
        }else{
            toast.error("Some Thing Is Wrong!")
        }
    }else{
        toast.success("Process Canceld")
    }
}


export async function countOrder(){
    const getCookie = Cookies.get("auth_token")
    const checkInfo = await fetch(`${ConstantLink}/userOrder-api`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            cookie:getCookie
        })
    })
    const countInfo = await checkInfo.json()
    if(countInfo.user_order.length == 0){
        document.getElementById("order-qun-num1").style.display="none"
        document.getElementById("order-qun-num2").style.display="none"
    }else{
        document.getElementById("order-qun-num1").style.display="flex"
        document.getElementById("order-qun-num2").style.display="flex"
        document.getElementById("order-qun-num1").innerText=`${countInfo.user_order.length}`
        document.getElementById("order-qun-num2").innerText=`${countInfo.user_order.length}`
    }
    
}