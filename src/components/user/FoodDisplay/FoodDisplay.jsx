import React, { useContext } from 'react'
import "./fooddisplay.css"
import { Storecontext } from '../../../Context/StoreContext'
import FoodList from '../FoodList/FoodList'
import { food_images } from '../../../assets/assets'
function FoodDisplay({category}) {
 
 const {food_lists  } = useContext(Storecontext);

const foodwithimage=food_lists.map((food,index)=>{
 
  const matchingimage=food_images.find(food_image=>food_image.name==food.name)
  
  return{
    ...food,
    image:matchingimage?matchingimage.image:"none"
  }
})

  return (
    <div className='food-display' id='food-display'>
    <h1>Top dishes near you</h1>
    <div className="food-display-list">
        {foodwithimage?.map((list,index)=>{
          if(category==="all" ||   category === list.category){
          
            return (
                <FoodList key={index} id={list._id} price={list.price} name={list.name}  description={list.description} category={list.category} image={list.image}/>
            )
          }
            
        })}
    </div>
      
    </div>
  )
}

export default FoodDisplay
