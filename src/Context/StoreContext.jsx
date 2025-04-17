import { createContext, useEffect, useState } from "react";
import axios from "axios"
export const Storecontext = createContext(null);
import { userServices } from "../services/userServices";
const Storecontextprovider = (props) => {
  const [cartitems, setcartitems] = useState({});
  const [token,settoken]=useState("")

  

const [food_lists,setfoodlists]=useState([])
 
  const addtocart = async(itemId) => {
    if (!cartitems[itemId]) {
      setcartitems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setcartitems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
   
    // if(token){
    //  const response= await axios.post("http://localhost:4000/api/cart/add",{itemid:itemId},{headers:{token}})
    //  console.log(response,"data response")
    // }
  };



  //remove from cart
  const removefromcart =async (itemId) => {
    setcartitems((prev) => ({ ...prev, [itemId]: prev[itemId]- 1 }));
    // if(token){
    //   await axios.post("http://localhost:4000/api/cart/remove",{itemid:itemId},{headers:{token}})
    // }
    
  };

//fetch food list

const fetchfoodlist=async()=>{
  try {
    const response=await userServices.foodLists()
    if(response?.data?.success){
      setfoodlists(response?.data?.data)
    }
  } catch (error) {
    
  }
}

   

  //total cart amount
 const gettotalcartamount=()=>{
  let totalamount=0;
  for(const item in cartitems){
    if(cartitems[item]>0){
      let iteminfo=food_lists.find((product)=>product._id==item)
      totalamount+=iteminfo.price*cartitems[item]
    }
    
  }
  return totalamount;
 }

//  const loadCartData=async(token)=>{
//   const response=await axios.post('http://localhost:4000/api/cart/getcart',{},{headers:{token}})
//   setcartitems(response.data.cartdata)
//  }






 useEffect(()=>{
  async function loaddata(){
    await fetchfoodlist()
    const token=localStorage.getItem("userToken")
    if(token){
      settoken(token)
    }
  }
  loaddata()

 },[])
  const contextvalue = {
    food_lists,
    cartitems,
    setcartitems,
    addtocart,
    removefromcart,
    gettotalcartamount,
    token,
    settoken
  };
  return (
    <Storecontext.Provider value={contextvalue}>
      {props.children}
    </Storecontext.Provider>
  );
};

export default Storecontextprovider;
