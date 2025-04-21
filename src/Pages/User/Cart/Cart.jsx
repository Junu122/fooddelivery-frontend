import React, { useContext } from "react";
import "./cart.css";
import { Storecontext } from "../../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { food_images } from "../../../assets/assets";

function Cart() {
  const { cartitems, food_lists, deleteCartItem,getcarttotal } = useContext(Storecontext);     
  const navigate = useNavigate(); 
 
  return (
    <div className="cart">
      {cartitems.items.length > 0 ? ( 
        <>
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />

            {cartitems?.items?.length > 0 && 
              cartitems.items.map((cartitem, index) => {
                const itemDetails = typeof cartitem.itemId === 'object'
                  ? cartitem.itemId
                  : food_lists?.find(food => food._id === cartitem.itemId);
                
                return (
                  <div key={index}>
                    <div className="cart-items-item cart-items-title">
                      <p>{itemDetails?.name}</p>
                      <p>{itemDetails.category}</p>
                      <p>&#8377;{itemDetails?.price * 10}</p>
                      <p>{cartitem?.quantity}</p>
                      <p>&#8377;{cartitem?.quantity * itemDetails.price * 10}</p>
                      <p
                        className="cross"
                        onClick={() => {
                          deleteCartItem(itemDetails._id);
                        }}
                      >
                        x
                      </p>
                    </div>
                    <hr />
                  </div>
                );
              })
            }
          </div>
          
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart total</h2>
              <div>
                <div className="cart-total-details">
                  <p>Total</p>
                  <p>&#8377;{getcarttotal()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery-fee</p>
                  <p>&#8377;{2 * 10}</p>
                </div>
                <div className="cart-total-details">
                  <p>Convenient-fee</p>
                  <p>&#8377;{ 10}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Sub-total</b>
                  <b>&#8377;{getcarttotal()+20+10}</b>
                </div>
              </div>
              <button
                onClick={() => {
                  navigate("/placeorder"); 
                }}
              >
                Proceed to checkout
              </button>
            </div>
            <div className="cart-promocode">
              <div>
                <p>If you have a promocode enter it here</p>
                <div className="cart-promocode-input">
                  <input type="text" placeholder="Enter the promo-code" />
                  <button>Apply</button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="no-items-container empty-cart-border"> {/* Fixed: class to className */}
          <div className="cart-empty-icon">🛒</div>
          <h1>No items in cart</h1>
          <p className="empty-cart-message">Your cart is currently empty. Browse our tasty food to find something you'd like to eat.</p>
          <a href="/" className="continue-shopping-btn">Continue ordering</a>
        </div>
      )}
    </div>
  );
}

export default Cart;