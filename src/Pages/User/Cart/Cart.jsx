import React, { useContext } from "react";
import "./Cart.css";
import { Storecontext } from "../../../Context/StoreContext";
import { useNavigate ,useLocation} from "react-router-dom";

function Cart() {
  const { cartitems, food_lists, deleteCartItem, getcarttotal,token } = useContext(Storecontext);
  const navigate = useNavigate();
  const location=useLocation()

  return (
    <div className="cart">
      {cartitems?.items?.length > 0 ? (
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

                // Mobile view will show data labels
                return (
                  <div key={index}>
                    <div className="cart-items-item">
                      <p data-label="Item:">{itemDetails?.name}</p>
                      <p data-label="Category:">{itemDetails.category}</p>
                      <p data-label="Price:">&#8377;{itemDetails?.price }</p>
                      <p data-label="Quantity:">{cartitem?.quantity}</p>
                      <p data-label="Total:">&#8377;{cartitem?.quantity * itemDetails.price }</p>
                      <p
                        className="cross"
                        onClick={() => {
                          deleteCartItem(itemDetails._id);
                        }}
                      >
                        ×
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
                  <p>Delivery fee</p>
                  <p>&#8377;{2 * 10}</p>
                </div>
                <div className="cart-total-details">
                  <p>Convenience fee</p>
                  <p>&#8377;{10}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Sub-total</b>
                  <b>&#8377;{getcarttotal() + 20 + 10}</b>
                </div>
              </div>
              <button
                onClick={() => {
                
                    navigate("/PlaceOrder");
                 
                  
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
        <div className="no-items-container empty-cart-border">
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