import '../styles/fotter.css'
function Fotter(){
    return(<>
    
    <div className="fotter">
        

            <div className="flex-footer">


                <div className="side-mes1">
                    <a href="">Home</a><br/>
                    <a href="">About</a><br/>
                    <a href="">Product</a><br/>
                    <a href="">Sign In</a><br/>
                </div>



                <div className="side-mes2">
              <p><box-icon name='location-plus'size="xs" color="white"></box-icon>&nbsp;&nbsp;Loaction : Addis Abeba</p>
              <p><box-icon name='envelope' size="xs" color="white"></box-icon>&nbsp;&nbsp;Email : ekidame@gmail.com</p>
              <p><box-icon name='phone-call' size="xs" color="white"></box-icon>&nbsp;&nbsp;Phone : +251962579755</p>
                </div>


                
                <div className="side-mes2">
                  <p>&copy;Copy Right To E Kidame </p>
                  <p>This Web Created By Yohanes Mulugeta</p>
                </div>


       

            </div>


    </div>
    
    </>)
}

export default Fotter