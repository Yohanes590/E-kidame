import { Route,Routes } from "react-router-dom"
import NavBar from "./componets/nav-bar"
import HomeUi from "./componets/home"
import About from "./componets/about"
import Delivery from "./componets/delivery"
import Slider from "./componets/slider"
import Fotter from "./componets/fotter"
import Loader from "./componets/loader"
import 'boxicons'
import Products from "./componets/products"
import Contact_page from "./componets/contact"
import SignIn from "./componets/sign-in"
import Login from "./componets/login"
import Order from "./componets/order"
import Admin_function from "./componets/admin"
import Admin_dashboard from "./componets/admin-dashboard"
import ForoFor from "./componets/404"
function Home(){
  return(
    <>
    <Routes>
<Route path="/" element={<>
<Loader></Loader>
  <NavBar></NavBar>
  <HomeUi></HomeUi>
  <About></About>
  <Delivery></Delivery>
  <Contact_page></Contact_page>
  <Slider></Slider>
  <Fotter></Fotter>
</>}/>
<Route path="/about" element={<>
  <Loader></Loader>
  <NavBar></NavBar>
  <About></About>
  <Contact_page></Contact_page>
  <Slider></Slider>
  <Fotter></Fotter>
</>}/>

<Route path="/products" element={<>
<Loader></Loader>
<NavBar></NavBar>
<Products></Products>
</>}/>
<Route path="/sign-up" element={<>
<Loader></Loader>
<SignIn></SignIn>

</>}></Route>

<Route path="/login" element={<>
<Loader></Loader>
<Login></Login>
</>}></Route>

<Route path="/order" element={
  <>
  <Loader></Loader>
  <NavBar></NavBar>
  <Order></Order>
  </>
}>
</Route>

<Route path="/admin-control" element={
  <>
    <Loader></Loader>
    <Admin_function></Admin_function>
  </>
}></Route>

<Route path="/admin-dashboard" element={
  <>
    <Loader></Loader>
    <Admin_dashboard></Admin_dashboard>
  </>
}/>

<Route path="*" element={<ForoFor/>}/>

    </Routes>


    
    </>
  )
}

export default Home