import React, { useContext, useState } from 'react'
import "./FoodList.css"
import { assets } from "../../../assets/assets"
import { Storecontext } from '../../../Context/StoreContext';


function FoodList({ id, price, name, image, description }) {
  const {cartitems,addtocart,removefromcart}=useContext(Storecontext)

  const cartItem = cartitems?.items?.find(item => {
    if (typeof item.itemId === 'object' && item.itemId._id) {
      return item.itemId._id === id;
    } else if (typeof item.itemId === 'string') {
      return item.itemId === id;
    }
    return false;
  });
 
  const quantity = cartItem ? cartItem?.quantity : 0;
  return (
    <div className='food-item '>
      <div className="food-item-image-container">
        <img className='food-item-image' src={image} alt="" />
        
       
    {
      !quantity && ( <img  className='add'    onClick={() => addtocart(id)}      src={assets.add_icon_white} alt=''/>)
    }
  
{
  quantity>0 && (<div className="food-item-counter">
        <img onClick={() => removefromcart(id)} src={assets.remove_icon_red} alt="" />
        <p>{quantity}</p>
        <img onClick={() => addtocart(id)} src={assets.add_icon_green} alt="" />
      </div>)
}
     

      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          {/* <img src={assets.rating_starts} alt="" /> */}
        </div>
        <p className="food-description">{description}</p>
        <p className="food-item-price">&#8377;{price }</p>


      </div>

    </div>
  )
}

export default FoodList
