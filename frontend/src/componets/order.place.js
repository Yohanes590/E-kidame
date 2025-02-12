import {toast} from "react-toastify"
export function orderPlace(){
   const valueOfOrder = document.getElementById("number-of-order").value;
   if(valueOfOrder == ""){
    toast.error("please insert order value")
    document.getElementById("number-of-order").style.borderColor="red"
   }else{
    toast.success("orderd success fully")
   }
}