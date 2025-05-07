import { createContext, useEffect, useState } from "react";
export const Storecontext = createContext(null);
import { userServices } from "../services/userServices";
import Loading from "../utils/Loading/Loading";
import { adminService } from "../services/adminServices";
const Storecontextprovider = (props) => {
  //user side
  const [cartitems, setcartitems] = useState({items:[]});
  const [token,settoken]=useState("")
const [food_lists,setfoodlists]=useState([])
const [Load,setLoad]=useState(false)
const [TodaySpecial,setTodaySpecial]=useState([])
const [menu, setmenu] = useState("home");

//admin side
const [Users,setUsers]=useState([]);
const [FoodLists,setFoodLists]=useState([])
const [Orders,setOrders]=useState([])
const [adminToken,setadminToken]=useState("")



const addtocart = async(itemId) => {
  if(token){
    try {
      const response = await userServices.addToCart({itemId: itemId}, token);
      if(response && response.data.success === true){
         const updatedCart= await userServices.userCart(); 
         console.log(updatedCart,"updated cart")
         setcartitems(updatedCart?.data?.usercart)
       
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  } else {
    setcartitems(prev => {
   
      const currentState = prev || { items: [] };
      
      const existingItemIndex = currentState?.items?.findIndex(item => 
        (typeof item.itemId === 'object' ? item.itemId._id : item.itemId) === itemId
      );
      
      if (existingItemIndex >= 0) {
        return {
          ...currentState,
          items: currentState.items.map((item, index) => 
            index === existingItemIndex && item.quantity < 10
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...currentState,
          items: [...(currentState?.items || []), { 
            itemId: itemId,
            quantity: 1 
          }]
        };
      }
    });
  }
};



  //remove from cart
  const removefromcart = async(itemId) => {
    if(token){
      try {
        const response = await userServices.removeFromCart({itemId: itemId}, token);
     
        if(response && response.data.success === true){
          const updatedCart = await userServices.userCart(); 
          if (updatedCart && updatedCart?.data?.success) {
          
            setcartitems(updatedCart?.data?.usercart);
          } else {
            
            setcartitems(prevCart => {
              const existingItemIndex = prevCart?.items?.findIndex(item => 
                (typeof item.itemId === 'object' ? item.itemId._id : item.itemId) === itemId
              );
              
              if (existingItemIndex >= 0) {
                const items = prevCart.items;
                if (items[existingItemIndex].quantity === 1) {
                
                  return {
                    ...prevCart,
                    items: items.filter((_, index) => index !== existingItemIndex)
                  };
                } else {
             
                  return {
                    ...prevCart,
                    items: items.map((item, index) => 
                      index === existingItemIndex
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                    )
                  };
                }
              }
              return prevCart;
            });
          }
        }
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    } else {
     
      setcartitems(prev => {
        const existingItemIndex = prev?.items?.findIndex(item => 
          (typeof item.itemId === 'object' ? item.itemId._id : item.itemId) === itemId
        );
        
        if (existingItemIndex >= 0) {
          const items = prev.items;
          if (items[existingItemIndex].quantity === 1) {
         
            return {
              ...prev,
              items: items.filter((_, index) => index !== existingItemIndex)
            };
          } else {
         
            return {
              ...prev,
              items: items.map((item, index) => 
                index === existingItemIndex
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              )
            };
          }
        }
        return prev;
      });
    }
  };

  

  const deleteCartItem = async (itemId) => {
    setcartitems(prev => {
      return {
        ...prev,
        items: prev?.items?.filter(item =>
          (typeof item.itemId === 'object' ? item.itemId._id : item.itemId) !== itemId)
      };
    });

    if (token) {
      try {
        const response = await userServices.removeFromCart({ itemId }, token);
        
        if (!response?.data?.success) {
       
          const updatedCart = await userServices.userCart();
          if (updatedCart?.data?.success) {
            setcartitems(updatedCart.data.usercart);
          }
        }
      } catch (error) {
        console.error("Error deleting from cart:", error);
      
        try {
          const updatedCart = await userServices.userCart();
          if (updatedCart?.data?.success) {
            setcartitems(updatedCart.data.usercart);
          }
        } catch (fetchError) {
          console.error("Error fetching cart after failed delete:", fetchError);
        }
      }
    }
  };

//fetch food list
const fetchfoodlist=async()=>{
  try {
    const response=await userServices.foodLists();
   
    if(response?.data?.success){
      setfoodlists(response?.data?.data)
      setTodaySpecial(response?.data?.todayspecial)
    }
  } catch (error) {
    
  }
}

//load cart
const loadCart = async () => {
  if (token) {
    try {
      const response = await userServices.userCart();
      if (response && response.data.success) {
        setcartitems(response.data.usercart);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  }
};



const getcarttotal=()=>{
  let carttotal=0;
  cartitems?.items?.map((item)=>{
  const cart= typeof item.itemId === 'object'
    ? item.itemId
    : food_lists?.find(food => food._id === item.itemId)
    carttotal+=item.quantity*(cart.price*10)
  })
  return carttotal
}


//admin side controls
const dashboardDatas=async()=>{
  if(adminToken){
    try {
      const response=await adminService.userdata()
      if(response?.data?.allUsers){
        setUsers(response?.data?.allUsers)
      }
     const fooddata=await adminService.fooddata();
     if(fooddata?.data?.allFoods){
      setFoodLists(fooddata?.data?.allFoods)
    }
     
      const orderdata=await adminService.orderdata()
    if(orderdata?.data?.success){
      setOrders(orderdata?.data?.allOrders)
    }
    } catch (error) {
      console.log(error)
    }
  }
 
}







 useEffect(()=>{
  setTimeout(() => {
    async function loaddata(){
      const token=localStorage.getItem("userToken")
      if(token){
        settoken(token)
       
      }
      await fetchfoodlist()
    }
    setLoad(true)
    loaddata()
  }, 1000);
 
 },[token])

 useEffect(()=>{
  fetchfoodlist()
  loadCart()
},[token])



useEffect(()=>{
  setTimeout(() => {
    async function loadadmin(){
      const tokenadmin=localStorage.getItem('adminToken');
      if(tokenadmin){
        setadminToken(tokenadmin)
        
      }
    }
    loadadmin()
  }, 1000);
},[adminToken])

useEffect(() => {
  dashboardDatas()
 
}, [adminToken]);



if(!Load){
  return <Loading />
}
  const contextvalue = {
    food_lists,
    cartitems,
    setcartitems,
    addtocart,
    removefromcart,
    token,
    settoken,
    deleteCartItem,
    getcarttotal,
    Load,
    TodaySpecial,
    menu, 
    setmenu,


    Users,
    FoodLists,
    Orders,
    setOrders,
    setadminToken,
    setFoodLists
   
  };
  return (
    <Storecontext.Provider value={contextvalue}>
      {props.children}
    </Storecontext.Provider>
  );
};

export default Storecontextprovider;
