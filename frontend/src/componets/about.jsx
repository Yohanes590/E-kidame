import '../styles/about-style.css'
import jaket from "../assets/jaket.png"
function About(){

    return(<>
    
    
        <div className="about">

            <div className="about-card">


            <div className="about-image">
                    <img src={jaket}/>
                </div>

            <div className="about-text">
            <h2>50% Offer For All Coustomers</h2>
            <h3>Get Now New Products And New Brands</h3>
            <button>Get Now</button>
            </div>


            </div>

        </div>


    
    </>)
}

export default About