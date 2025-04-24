import React from 'react'
import './FeaturedFoodCard.css'
const FeaturedFoodCard = ({food}) => {
  return (
      <div className="special-menu-card">
            <div className="food-img">
              <img src={food.image} alt="Margherita Pizza" />
            </div>
            <div className="food-info">
              <h3>{food.name}</h3>
              <p>{food.description}</p>
              <div className="food-price-cart">
                <span className="price"> &#8377; {food.price*10}</span>
                <button className="add-to-cart" >Order now</button>
              </div>
            </div>
          </div>
  )
}

export default FeaturedFoodCard
