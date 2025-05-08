import React, { useContext, useEffect, useState } from "react";
import { Storecontext } from "../../../Context/StoreContext";
import "./Placeorder.css";
import { useNavigate } from "react-router-dom";
import { userServices } from "../../../services/userServices";
function PlaceOrder() {
  const navigate = useNavigate();
    const {getcarttotal,  cartitems,setcartitems } =
    useContext(Storecontext);
  const [Data, setData] = useState({
    firstname: "",
    lastname: "",
    city: "",
    email: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onchangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };


  const placeorder = async (e) => {
    e.preventDefault()
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }
     const data={
      amount:getcarttotal()+30,
      currency:"INR",
      receipt:'receipt_order_' + Date.now(),
      notes:cartitems
     }
    const response=await userServices.createOrder(data);
    console.log(response,"response in creating cart")
    if(response?.data?.succes){

      
     
      const options = {
        key: 'rzp_test_dFrlarHft7rxIN', 
        amount: response.data.order.amount,
        currency: response.data.order.currency,
        name: 'Tomato',
        description: 'Food Order Payment',
        order_id: response.data.order.id,
        handler: function(responsedata) {
         console.log(responsedata)
         verifyPayment(responsedata,response.data.order,Data)
        },
        prefill: {
          name: Data.firstname + ' ' + Data.lastname,
          email: Data.email,
          contact: data.phone
        },
       
        theme: {
          color: '#3399cc'
        }
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }else{
      console.log("error occured")
    }
   

  };

  const verifyPayment=async (paymentData,orderdetails,Data)=>{
    try {
      console.log(orderdetails)
      const isverify=await userServices.verifyPayment(paymentData,orderdetails,Data)
      console.log(isverify,"is verified.............")
      if(isverify?.data?.success){
        setcartitems([])
        console.log(isverify,"isverify")
        navigate(`/payment/${isverify?.data?.orderdata._id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
 

 
  return (
    <form className="palce-order" onSubmit={placeorder}>
      <div className="place-order-left">
        <p className="title">Delivery information</p>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="first name"
            name="firstname"
            onChange={onchangehandler}
          />
          <input
            type="text"
            placeholder="last name"
            name="lastname"
            onChange={onchangehandler}
          />
        </div>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={onchangehandler}
        />
        <input
          type="text"
          placeholder="address"
          name="address"
          onChange={onchangehandler}
        />
        <div className="multi-fields">
          <input
            type="text"
            placeholder="city"
            name="city"
            onChange={onchangehandler}
          />
          <input
            type="text"
            placeholder="state"
            name="state"
            onChange={onchangehandler}
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="zip-code"
            name="zipcode"
            onChange={onchangehandler}
          />
          <input
            type="text"
            placeholder="country"
            name="country"
            onChange={onchangehandler}
          />
        </div>
        <input
          type="text"
          placeholder="phone"
          name="phone"
          onChange={onchangehandler}
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart total</h2>
          <div>
            <div className="cart-total-details">
              <p>Total</p>
              <p>&#8377;{getcarttotal() }</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery-fee</p>
              <p>&#8377;{2 * 10}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Sub-total</b>
              <b>&#8377;{getcarttotal()+ 10 + 20}</b>
            </div>
          </div>
          <button type="submit">Proceed to payment</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
