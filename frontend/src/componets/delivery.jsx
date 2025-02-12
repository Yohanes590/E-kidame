import '../styles/deliver-style.css'
import deliver from '../assets/delivery.svg'
function Delivery(){
    document.addEventListener("scroll",()=>{
       const scrollYAxis = scrollY;
       if(scrollYAxis > 800){
        document.querySelector(".del-text").style.opacity="1"
        document.querySelector(".del-text").style.marginLeft="0px"
        document.querySelector(".del-image").style.opacity="1"
        document.querySelector(".del-image").style.marginRight="0px"
       }
    })
    return(<>
    <div className="delivery">
        
            <div className="del-text">
                <h1>Delivery Service For Coustomers <box-icon name='check' ></box-icon></h1>
                <div className="line"></div>
<br/>
                <h3> We Give Free Delivery Service For All My Coustomers.
                    In Our Delivery Service We Deliver By On Time. 
                    And We User Motors, Cars , And Some Times Even Truck's
                </h3>
            </div>

            <div className="del-image">
                <img src={deliver} />
            </div>

    </div>
    
    </>)
}

export default Delivery