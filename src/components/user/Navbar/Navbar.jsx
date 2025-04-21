import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { Storecontext } from "../../../Context/StoreContext";

const  Navbar = ({ setshowlogin }) => {
  const navigate=useNavigate()
  const [menu, setmenu] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { gettotalcartamount,token,settoken ,cartitems, setcartitems } = useContext(Storecontext);
 
   const logout = () => {
    localStorage.removeItem("userToken");
    setcartitems("")
    settoken("")
    navigate("/")
  };

  // Close mobile menu when clicking on a link
  const handleMenuClick = (menuItem) => {
    setmenu(menuItem);
    setMobileMenuOpen(false);
  };

  // Handle scroll events for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <Link to={"/"}>
          <img src={assets.logo} alt="Food App Logo" className={`logo ${mobileMenuOpen?"hide-logo":""}`} />
        </Link>
        
        <ul className="navbar-menu">
          <a
            
            href="#header"
            onClick={() => setmenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </a>
          <a
            href="#explore-menu"
            onClick={() => setmenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </a>
          <a
            href="#app-download"
            onClick={() => setmenu("mobileapps")}
            className={menu === "mobileapps" ? "active" : ""}
          >
            Mobile-Apps
          </a>
          <a
            href="#footer"
            onClick={() => setmenu("contactus")}
            className={menu === "contactus" ? "active" : ""}
          >
            Contact-Us
          </a>
        </ul>
        
        <div className="navbar-right">
          
          <div className="navbar-basket-icon">
            <Link to={"/cart"}>
              <img src={assets.basket_icon} alt="Cart" />
            </Link>
          
              {
                cartitems?.items?.length> 0 && (
                  <div className="dot">
                 {cartitems?.items?.length}
               </div>
                )
              }
         
          </div>
          
          {!token ? (
            <button onClick={() =>{navigate("/login")} }>Sign-In</button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="Profile" />
              <ul className="nav-profile-dropdown">
                <li>
                  <img src={assets.bag_icon} alt="Orders" />
                  <Link to={"/myorders"}>
                    <p>Orders</p>
                  </Link>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="Logout" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
          
          <div 
            className={`mobile-menu-btn ${mobileMenuOpen ? "mobile-menu-open" : ""}`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
      <Link to={"/"}>
          <img src={assets.logo} alt="Food App Logo" className="logo" />
        </Link>
        <Link
          to={"/"}
          onClick={() => handleMenuClick("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => handleMenuClick("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => handleMenuClick("mobileapps")}
          className={menu === "mobileapps" ? "active" : ""}
        >
          Mobile-Apps
        </a>
        <a
          href="#footer"
          onClick={() => handleMenuClick("contactus")}
          className={menu === "contactus" ? "active" : ""}
        >
          Contact-Us
        </a>
      
       
        
        {token ?(
          <>
            <hr />
            <Link
              to={"/myorders"}
              onClick={() => handleMenuClick("")}
            >
              My Orders
            </Link>
            <a href="#" onClick={logout}>Logout</a>
          </>
        ): <button onClick={() => setshowlogin(true)}>Sign-In</button>}
      </div>
      
      {/* Overlay for mobile menu */}
      <div 
        className={`mobile-menu-overlay ${mobileMenuOpen ? "active" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>
    </>
  );
};

export default Navbar;