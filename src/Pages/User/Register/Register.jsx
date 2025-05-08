import React, { useContext, useState, useEffect } from "react";
import { assets } from "../../../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Storecontext } from "../../../Context/StoreContext";
import "./Register.css";
import { userServices } from "../../../services/userServices";

function Register({}) {
  const navigate = useNavigate();
  const [data, setdata] = useState({});
  const { settoken } = useContext(Storecontext);

  const [errorMessage, seterrorMessage] = useState({
    email: "",
    password: "",
  });
 

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata((prev) => ({ ...prev, [name]: value }));
    seterrorMessage((prev)=>({...prev,[name]:""}))
  };
  console.log(data);

  const validateData = (data) => {
    let error = {};
    if (!data.name) {
      error.name = "name is required";
    }
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
    const errors = validateData(data);
    if (errors.name || errors.email || errors.password) {
      seterrorMessage({
        name: errors.name || "",
        email: errors.email || "",
        password: errors.password || "",
      });

      console.log("Validation errors:", errors);
      return;
    }

    try {
      const response = await userServices.userRegister(data);
      console.log(response, "userregister response");
      if (response?.data?.success) {
        settoken(response?.data?.token);
        localStorage.setItem("userToken", response?.data?.token);
        toast.success("user register success")
        navigate("/");
      } else {
        const newErrorMessages = {
          email: response?.data?.emailMessage || "",
          password: response?.data?.passwordMessage || "",
        };

       
        seterrorMessage(newErrorMessages);
      
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleclose = () => {
    navigate("/");
  };


 

  return (
    <>
      <div
        className="register-popup"
        onClick={(e) => {
          if (e.target.className === "register-popup") {
            handleclose();
          }
        }}
      >
        <form className="register-popup-container" onSubmit={handleSubmit}>
          <div className="register-popup-title">
            <h2>register</h2>
            <img
              onClick={() => handleclose()}
              src={assets.cross_icon}
              alt="Close"
            />
          </div>
          <div className="register-popup-input">
            <input
              onChange={handlechange}
              type="text"
              placeholder="Name"
              name="name"
              className={`${errorMessage.name && "error-style"} input-style`}
            />
            {errorMessage.email && (
              <p className="error-text">{errorMessage.name}</p>
            )}
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
              className={`${
                errorMessage.password && "error-style"
              } input-style`}
            />
            {errorMessage.password && (
              <p className="error-text">{errorMessage.password}</p>
            )}
          </div>
          <button type="submit">register</button>
          <div className="register-popup-condition">
            <input type="checkbox" required />
            <p>I agree the terms & conditions and accept privacy policy</p>
          </div>

          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Click here</span>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
