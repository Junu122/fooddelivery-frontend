import React, { useContext, useState, useEffect } from "react";
import { assets } from "../../../assets/assets";
import { useNavigate,useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { Storecontext } from "../../../Context/StoreContext";
import { userServices } from "../../../services/userServices";

import "./Login.css";


function Login() {
  const location = useLocation();
  const navigate=useNavigate()
  const {token,settoken}=useContext(Storecontext)
  const [data, setdata] = useState({});
  const [errorMessage, seterrorMessage] = useState({
    email: "",
    password: ""
  });

  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, []);

  const handlechange = (e) => {
    seterrorMessage({})
    const name = e.target.name;
    const value = e.target.value;
    setdata((prev) => ({ ...prev, [name]: value }));
    seterrorMessage((prev)=>({...prev,[name]:""}))
  };
  
  //validate data
  const validateData = (data) => {
    let error = {};
    if (!data.email) {
      error.email = "email id is required";
    }
    if (!data.password) {
      error.password = "password is required";
    }
    return error;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    
    const errors = validateData(data);
    if (errors.email || errors.password) {
    
      seterrorMessage({
        email: errors.email || "",
        password: errors.password || ""
      });
      
      
      console.log("Validation errors:", errors);
      return;
    }
    
    try {
      const response = await userServices.userLogin(data);
      const from = location.state?.from || "/";
      
      console.log(response);
      if (response?.data?.success) {
        settoken(response?.data?.token)
        localStorage.setItem("userToken",response?.data?.token)
        toast.success("login success")
        navigate(from);
        console.log("login success");
      } else {
        const newErrorMessages = {
          email: response?.data?.emailMessage || "",
          password: response?.data?.passwordMessage || ""
        };
        
        
        seterrorMessage(newErrorMessages);
        console.log("Server response errors:", newErrorMessages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleclose=()=>{
    navigate("/")
  }

  // This effect will log error messages whenever they change
  useEffect(() => {
    if (errorMessage.email || errorMessage.password) {
      console.log("Current error messages:", errorMessage);
    }
  }, [errorMessage]);

  return (
    <>
      <div
        className="login-popup"
        onClick={(e) => {
         
          if (e.target.className === "login-popup") {
          
            handleclose()
          }
        }}
      >
        <form className="login-popup-container" onSubmit={handleSubmit}>
          <div className="login-popup-title">
            <h2>login</h2>
            <img
              onClick={() => handleclose()}
              src={assets.cross_icon}
              alt="Close"
            />
          </div>
          <div className="login-popup-input">
            <input
              onChange={handlechange}
              type="email"
              placeholder="Email ID"
              name="email"
              className={`${errorMessage.email && "error-style"} input-style`}
            />
            {errorMessage.email && (
              <p className="error-text">{errorMessage.email}</p>
            )}
            <input
              onChange={handlechange}
              type="password"
              placeholder="Password"
              name="password"
              className={`${errorMessage.password && "error-style"} input-style`}
            />
            {errorMessage.password && (
              <p className="error-text">{errorMessage.password}</p>
            )}
          </div>
          <button type="submit">Login</button>
            <p>
              Create a new account?{" "}
              <span onClick={() => navigate("/register")}>Click here</span>
            </p>
          
        </form>
      </div>
    </>
  );
}

export default Login;