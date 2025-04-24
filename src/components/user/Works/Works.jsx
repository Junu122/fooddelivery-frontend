import React from 'react'
import './Works.css'
import {MousePointer2,SearchCheck,Truck,Utensils} from "lucide-react"
const Works = () => {
  return (
    <section className="how-it-works">
    <h2>How It Works</h2>
    <div className="steps">
      <div className="step">
        <div className="step-icons">1</div>
        <MousePointer2 />
        <h3>Choose Your Food</h3>
        <p>Browse our menu and select your favorite dishes</p>
      </div>
      <div className="step">
        <div className="step-icons">2</div>
        <SearchCheck />
        <h3>Place Your Order</h3>
        <p>Confirm your order and proceed to checkout</p>
      </div>
      <div className="step">
        <div className="step-icons">3</div>
        <Truck />
        <h3>Fast Delivery</h3>
        <p>Get your food delivered to your doorstep</p>
      </div>
      <div className="step">
        <div className="step-icons">4</div>
        <Utensils />
        <h3>Enjoy Your Meal</h3>
        <p>Sit back, relax, and enjoy your delicious food</p>
      </div>
    </div>
  </section>
  )
}

export default Works
