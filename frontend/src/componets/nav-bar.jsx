import '../styles/nav-style.css'
import { check_cookie } from './check-cookie';
import { deleteAccount , logOut} from './Auth';
import { ToastContainer } from 'react-toastify';
import { countOrder } from './fetching-product';
function NavBar (){
    setTimeout(() => {
        check_cookie()
        countOrder()
    }, 100);
function OpenHidenMenu(){
    const menubar = document.querySelector(".hidden-menu-bar").style.width;
    if(menubar == ""){
        document.querySelector(".hidden-menu-bar").style.width="100%"
        document.querySelector(".hidden-menu").innerHTML="<box-icon name='x' color='white'size='md'></box-icon>"
    }else{
        document.querySelector(".hidden-menu-bar").style.width=""
        document.querySelector(".hidden-menu").innerHTML="<box-icon name='menu' color='white'size='md'></box-icon>"

    }
}

const routeToOrder = ()=>{
    window.location.href="/order"
}

const openAccount = ()=>{
   const container= document.querySelector(".account-status-bar")
   if(container.style.height == "0px"){
    container.style.height="90px"
    container.style.paddingTop="10px"
   }else{
    container.style.height="0px"
    container.style.paddingTop="0px"
   }
}

const signUp = ()=> window.location.href = "/sign-up"
const login = ()=> window.location.href="/login"
    return(<>
        <div className="navigation-bar">
            <div className="logo">
                <h2><span>E</span> - Kidame</h2>
            </div>
                <div className="links">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/products">Products</a>
                </div>
                <div className="search-account">
         
                    <div onClick={openAccount} className="achive">
                    <box-icon name='archive-in' color="white"></box-icon>
                    <p id='order-qun-num1'></p>
                    <label id='email2'>Email</label>
                    </div>
                </div>
            <div onClick={OpenHidenMenu} className="hidden-menu">
            <box-icon  name='menu' color="white" size="md"></box-icon>
            </div>
            <div className="sign-up">
                <span id="one">
                    <button onClick={signUp}>Sign Up</button>
                    <button onClick={login} id='detail'>Login</button>
                    </span>
                </div>
        </div>
        <div className="hidden-menu-bar">
                <div className="hidden-links">
                <a href="/">Home</a><br/>
                    <a href="/about">About</a><br/>
                    <a href="/products">Products</a><br/>
                    <div className="search-account">

<div className="achive">
<box-icon name='archive-in' color="white"></box-icon>
<p id='order-qun-num2'></p>
<label id='email3'></label>
</div>
<div className="account-status-bar2">
            <div className="hover" onClick={routeToOrder}><p>Orders</p></div>
            <div className="hover" onClick={logOut}><p>Logout</p></div>
            <div className="hover" onClick={deleteAccount}><p>Delete Account</p></div>
        </div>
</div>

<div className="sign-up">
    <span id="three">

                    <button onClick={signUp}>Sign Up</button>
                    <button onClick={login} id='detail'>Login</button>
                    </span>
                </div>
                </div>
        </div>
        <div className="account-status-bar">
            <div className="hover" onClick={routeToOrder}><p>Orders</p></div>
            <div className="hover" onClick={logOut}><p>Logout</p></div>
            <div onClick={deleteAccount} className="hover"><p>Delete Account</p></div>
        </div>
        <ToastContainer/>
    </>)
}

export default NavBar