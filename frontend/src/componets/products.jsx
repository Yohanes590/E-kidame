import '../styles/products.css'
import { orderPlace } from './order.place'
import { ToastContainer } from 'react-toastify'
import { clintSide_Product ,searchProducts} from './fetching-product'
function Products  (){
    clintSide_Product()
    return(<>
        <ToastContainer/>

        <div className="products">

            <div className="search-box">
                      <div className="searchborder">
                    <input type="text" id="search-input" placeholder='Search Products'/><button onClick={searchProducts}>Search</button>
                    </div>
            </div>


            <div className="details-page">

            <div className="product-photo">
                </div>

                <div className="product-discription">



                    </div>  

</div>


            <div id='prodact-details' className="prodact-details">

</div>

{/*  Searched Product */}


        </div>
    </>)
}

export default Products