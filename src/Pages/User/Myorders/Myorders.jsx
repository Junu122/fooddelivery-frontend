// MyOrdersPage.jsx
import React, { useState, useEffect,useContext } from 'react';
import './Myorders.css';
import { Storecontext } from '../../../Context/StoreContext';
import { userServices } from '../../../services/userServices';
import OrderTracking from '../../../components/user/OrderTracking/OrderTracking';
import { food_images } from '../../../assets/assets';
const Myorders = () => {
   const { menu, setmenu } = useContext(Storecontext);
  const [loading, setLoading] = useState(true);
  const [trackingOrderId, setTrackingOrderId] = useState(null);
  const [userOrder,setuserOrder]=useState([])
  useEffect(() => {
    setmenu('')
   const orderData=async()=>{
    const orderresponse=await userServices.myOrders()
    console.log(orderresponse,"......................")
    if(orderresponse){
      const orderwithimage=orderresponse?.data?.userorders.map((order)=>{
        order.items.map((item)=>{
          const matchingimage=food_images.find(food=>food.name==item.itemId.name)
          return{
            ...item.itemId,
            image:matchingimage.image
          }
        })
      })
        setuserOrder(orderwithimage)
    }
   }
   orderData()
    
  
    setLoading(false);
  }, []);




  console.log(userOrder,"userorder......................")

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered':
        return 'status-delivered';
      case 'in progress':
        return 'status-in-progress';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'paid':
        return 'payment-paid';
      case 'pending':
        return 'payment-pending';
      case 'failed':
        return 'payment-failed';
      default:
        return '';
    }
  };

  const toggleTracking = (orderId) => {
    if (trackingOrderId === orderId) {
      setTrackingOrderId(null);
    } else {
      setTrackingOrderId(orderId);
    }
  };




  if (loading) {
    return <div className="loading-container">Loading your orders...</div>;
  }

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      
      {userOrder.length === 0 ? (
        <div className="no-orders">
          <img src="/api/placeholder/200/200" alt="No orders" />
          <p>You haven't placed any orders yet.</p>
          <button className="browse-btn">Browse Restaurants</button>
        </div>
      ) : (
        <div className="orders-list">
          {userOrder.map((order) => (
            <div className="order-card" key={order.orderId}>
              <div className="order-header">
                <div className="order-id">
                  <h3>Order #{order._id}</h3>
                  <span className="order-date">{formatDate(order.createdAt)}</span>
                </div>
                <div className="order-status-container">
                  <span className={`order-status ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span className={`payment-status ${getPaymentStatusColor(order.paymentStatus)}`}>
                    Payment: {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="order-items">
                {order.items.map((item) => (
                  <div className="order-item" key={item._id}>
                    <div className="item-image">
                      <img src={item.itemId.image} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h4>{item.itemId.name}</h4>
                      <p className="item-quantity">Qty: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      ₹{item.itemId.price*item.quantity}
                    </div>
                  </div>
                ))}
              </div>
              
              {trackingOrderId === order.orderId && (
                <OrderTracking order={order} />
              )}
              
              <div className="order-footer">
                <div className="price-details">
                  <div className="price-row">
                    <span>Item Total</span>
                    <span>₹{order.totalAmount - 40}</span>
                  </div>
                  <div className="price-row">
                    <span>Delivery Fee</span>
                    <span>₹40</span>
                  </div>
                  <div className="price-row total">
                    <span>Total</span>
                    <span>₹{order.totalAmount}</span>
                  </div>
                </div>
                
                <div className="order-actions">
                  <button 
                    className={`track-button ${trackingOrderId === order.orderId ? 'active' : ''}`}
                    onClick={() => toggleTracking(order.orderId)}
                  >
                    {trackingOrderId === order.orderId ? 'Hide Tracking' : 'Track Order'}
                  </button>
                  
                  <button className="help-button">Need Help?</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Myorders;