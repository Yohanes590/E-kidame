import '../styles/loader.css'
import {SyncLoader } from 'react-spinners'
const Loader= ()=>{
    setTimeout(() => {
        document.querySelector(".loader").style.display="none"
    }, 3000);
    return(<>
    
    <div className="loader">
<div className="box">
<SyncLoader 
  color="#ae8800"
  speedMultiplier={0.6}
/><br/>
</div>
    </div>
    
    </>)
}

export default Loader