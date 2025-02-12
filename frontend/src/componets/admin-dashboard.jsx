import '../styles/admin-style.css'
import { Upload_product } from './Auth'
import { ToastContainer } from 'react-toastify'
import { fetchProductDetails } from './fetching-product'
import { toast } from "react-toastify"
import { useEffect } from 'react'
import { countUsers , countOrder, adminCertify} from './action-admin'
import Cookies from 'js-cookie'

function Admin_dashboard(){
useEffect(()=>{
    adminCertify()
    fetchProductDetails()
    countUsers()
    countOrder()
},[])

const logout = ()=>{
    if(confirm("Are You Sure To Logout")){
        Cookies.remove("admin-cookie")
        window.location.href="/"
    }else{
        toast.warning("Process Cancel")
    }
}

return(<>

        <div className="dashboard-nav">
            <h2>Admin Dashboard Section</h2>
        </div>

<div className="logout">
<button id='detail' onClick={logout}>LogOut</button>

</div>


            <div className="admin-card-section">

            <div className="alluserdata">

                <h2> <span id='userCounter'></span> Users On WebSite </h2>

                        <div className="table">

                            <table>
                                <thead>
                                    <tr>
                                    <th>First Name</th>
                                    <th>Second Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody id="users-info">
                                        

                                </tbody>

                            </table>


                        </div>



            </div>



<div className="order-catch">

<h2>Order Catch <span id='order-counter'></span></h2>


<table>

        <thead>
            <tr>
            <th>Coustomer Name</th>
            <th>Coustomer Email</th>
            <th>Coustomer Phone</th>
            <th>Product </th>
            <th>Product Quantity </th>
            <th>Image </th>
            <th>Action </th>
            </tr>
        </thead>

            <tbody id="order-data">
            
            </tbody>

</table>


</div>


<div className="up-load-product">

<h2>Upload Product</h2>


            <div className="upload-input-section">
                    <input type="text" id="product-name" placeholder='Product Name' /><br/>
                    <input type="text" id="product-title" placeholder='Product Title' /><br/>
                    <input type="text" id="product-price" placeholder='Product Price' /><br/>
                    <textarea id="product-discription" placeholder='Product Discripton'></textarea><br/>
                    <input  type="file" id='photo-file'/><br/>
                    <label htmlFor="photo-file">Choose Photo</label>
                    <button id='detail' onClick={Upload_product}>Upload</button>
            </div>

</div>

            </div>


            <div id='product-details' className="product-details">

            </div>

        <ToastContainer/>
    </>)
}

export default Admin_dashboard