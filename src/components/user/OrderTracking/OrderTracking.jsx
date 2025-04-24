import React from 'react'
import './OrderTracking.css'
const OrderTracking = ({ order }) => {
    const trackingSteps = [
        { key: 1, label: "Order Placed", icon: "📝" },
        { key: 2, label: "Preparing", icon: "👨‍🍳" },
        { key: 3, label: "Prepared", icon: "🍔" },
        { key: 4, label: "Out for Delivery", icon: "🚚" },
        { key: 5, label: "Delivered", icon: "✅" }
      ];
      const getFormattedEstimatedTime = (dateString) => {
        const date = new Date(dateString);
        date.setTime(date.getTime() +45 *60* 1000);
        
        return date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        });
      };
  return (
    <div className="order-tracking-container">
    <h3>Track Your Order</h3>
    <p className="estimated-time">
      Estimated delivery by <strong>{getFormattedEstimatedTime(order.createdAt)}</strong>
    </p>
    
    <div className="tracking-progress">
      {trackingSteps.map((step, index) => (
        <div 
          key={step.key} 
          className={`tracking-step ${order.trackingStatus >= step.key ? 'completed' : ''} ${order.trackingStatus === step.key ? 'current' : ''}`}
        >
          <div className="step-icon">{step.icon}</div>
          <div className="step-connector">
            {index < trackingSteps.length - 1 && <div className="connector-line"></div>}
          </div>
          <div className="step-label">{step.label}</div>
        </div>
      ))}
    </div>
    
    <div className="tracking-details">
      <p>
        {order.trackingStatus === 1 && "Your order has been received and is being processed."}
        {order.trackingStatus === 2 && "The restaurant is preparing your delicious meal."}
        {order.trackingStatus === 3 && "Your meal is prepared and waiting for pickup."}
        {order.trackingStatus === 4 && "Your order is on the way to your location!"}
        {order.trackingStatus === 5 && "Your order has been delivered. Enjoy your meal!"}
      </p>
    </div>
  </div>
  )
}

export default OrderTracking
