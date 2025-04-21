import React, { useContext, useEffect, useState } from "react";
import { Storecontext } from "../../../Context/StoreContext";
import "./placeorder.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../../utils/Loading/Loading";
function PlaceOrder() {
    const {getcarttotal, token, food_lists, cartitems,Load } =
    useContext(Storecontext);
  const [data, setdata] = useState({
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
    setdata((prev) => ({ ...prev, [name]: value }));
  };

  const placeorder = async (e) => {
    e.preventDefault();
    // let orderitems = [];
    // food_lists.map((item) => {
    //   if (cartitems[item._id] > 0) {
    //     let iteminfo = item;
    //     iteminfo["quantity"] = cartitems[item._id];
    //     orderitems.push(iteminfo);
    //   }
    // });
    // let orderdata = {
    //   address: data,
    //   items: orderitems,
    //   amount: gettotalcartamount() + 2,
    // };
    // let response = await axios.post(
    //   "http://localhost:4000/api/order/placeorder",
    //   orderdata,
    //   { headers: { token } }
    // );
    // console.log(response, "responseeeeeeeeeeeeeeeeee");
    // if (response.data.success) {
    //   const { session_url } = response.data;
    //   window.location.replace(session_url.url);
    // }
  };
  const navigate = useNavigate();

  
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
