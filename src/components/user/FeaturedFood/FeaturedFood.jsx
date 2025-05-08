import React from 'react'
import './FeaturedFood.css'
import { food_images,assets } from '../../../assets/assets'
import { useContext } from 'react'
import { Storecontext } from '../../../Context/StoreContext'
import FeaturedFoodCard from '../FeaturedFoodCard/FeaturedFoodCard'
const FeaturedFood = () => {
const {food_lists,TodaySpecial}=useContext(Storecontext)


const foodWithImage = TodaySpecial.map((special)=>{
   const matchingImage=food_images.find(food_image=>food_image.name==special.name)
   return{
    ...special,
    image:matchingImage.image 
   }
})
  

   

  return (
    <section className="menu-section">
    <h2>Today's Special</h2>
    <div className="menu-item">
    {
      foodWithImage.map((food,index)=>{
        return(
          <FeaturedFoodCard key={index} food={food}/>
        )
        
      })
    }
     
   
    </div>
    <button className="view-all-btn">View Full Menu</button>
  </section>
  )
}

export default FeaturedFood
