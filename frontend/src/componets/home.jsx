import "../styles/home-style.css"
import watch from '../assets/watch.webp'
function HomeUi (){

    const routeProduct = ()=>{
        window.location.href="/products"
    }

    const routeOrder = ()=>{
        window.location.href="/order"
    }

    return(<>
    
    <div className="home">


            
            <div className="text">
                <h1>Explore Luxury Products</h1>
                <h3>Brand And Luxury With Quality</h3>
                <p>E - kidame For All <box-icon name='dots-horizontal' ></box-icon></p>
                <p>With Free Develiver For Addis Abeba City</p>
                <p>Integrated With Maria Solution</p><br/>
                <div className="line"></div>
                <button onClick={routeProduct}>Explore</button>
                <button id="create" onClick={routeOrder}>Order</button>
            </div>

<div className="image">
    <img src={watch} />
</div>


    </div>
    
    </>)
}

export default HomeUi