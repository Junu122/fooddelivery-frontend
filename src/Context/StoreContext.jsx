import { createContext, useEffect, useState } from "react";
export const Storecontext = createContext(null);
import { userServices } from "../services/userServices";
const Storecontextprovider = (props) => {
  const [cartitems, setcartitems] = useState({items:[]});
  const [token,settoken]=useState("")
 

  

const [food_lists,setfoodlists]=useState([])

//add to cart
  const addtocart = async(itemId) => {

    if(token){
      
     setcartitems(prevCart=>{
      const existingItemIndex=prevCart?.items?.findIndex(item=>item.itemId==itemId)
      if (existingItemIndex >= 0) {
      return {
        ...prevCart,
        items:prevCart.items.map((item,index)=>{
          if(item.itemId==itemId && item.quantity<10){
            return {
              ...item,
              quantity:item.quantity+1
            }
          }
          return item
       
        })
      }
       
      } else {
      return {
        ...prevCart,
        items:[...prevCart.items, 
          { itemId:itemId,
             quantity: 1 }
        ]
      }
       
      }
     
     })
     
     const response= await userServices.addToCart({itemId:itemId},token)
    
    }else{
      const cartindex=cartitems.items.findIndex(item=>item.itemId==itemId);
      console.log(cartindex,"cartindex")
      if(cartindex=== -1){
        setcartitems(prev=>({
          ...prev,
          items:[...prev.items, 
            { itemId:itemId,
               quantity: 1 }
          ]
        }))
      }else{
        setcartitems(prev=>({
          ...prev,
          items:prev.items.map((item,index)=>{
            if(item.itemId==itemId && item.quantity<10){
              return {
                ...item,
                quantity:item.quantity+1
              }
            }
            return item
         
          })
        }))
      }
    }
  };



  //remove from cart
  const removefromcart = async (itemId) => {
    try {
      if (token) {
        const response = await userServices.removeFromCart({ itemId: itemId }, token);
        
        if (response && response?.data?.success === true) {
          setcartitems(prev => {
            // First map to decrease quantities
            const updatedItems = prev.items.map((item) => {
              if (item.itemId === itemId && item.quantity > 1) {
                return {
                  ...item,
                  quantity: item.quantity - 1
                };
              }
              if (item.itemId === itemId && item.quantity <= 1) {
                return {
                  ...item,
                  quantity: 0
                };
              }
              return item;
            });
            
            // Then filter out items with quantity 0
            return {
              ...prev,
              items: updatedItems.filter(item => item.quantity > 0)
            };
          });
        }
      } else {
        setcartitems(prev => {
          // First map to decrease quantities
          const updatedItems = prev.items.map((item) => {
            if (item.itemId === itemId && item.quantity > 1) {
              return {
                ...item,
                quantity: item.quantity - 1
              };
            }
            if (item.itemId === itemId && item.quantity <= 1) {
              return {
                ...item,
                quantity: 0
              };
            }
            return item;
          });
          
          // Then filter out items with quantity 0
          return {
            ...prev,
            items: updatedItems.filter(item => item.quantity > 0)
          };
        });
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };


  const fetchUserCart = async () => {
    try {
      const response = await userServices.userCart();
     console.log(response)
      if (response?.data?.success) {
        setcartitems(response?.data?.usercart );
        
      }else{
        console.log("not getting")
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  };

  

//fetch food list
const fetchfoodlist=async()=>{
  try {
    const response=await userServices.foodLists();
    if(response?.data?.success){
      setfoodlists(response?.data?.data)
    }
  } catch (error) {
    
  }
}

   









 useEffect(()=>{
  async function loaddata(){
    const token=localStorage.getItem("userToken")
    if(token){
      settoken(token)
      await fetchUserCart()
    }
    await fetchfoodlist()
  }
  loaddata()
 },[token])


  const contextvalue = {
    food_lists,
    cartitems,
    setcartitems,
    addtocart,
    removefromcart,
    token,
    settoken,
   
  };
  return (
    <Storecontext.Provider value={contextvalue}>
      {props.children}
    </Storecontext.Provider>
  );
};

export default Storecontextprovider;
