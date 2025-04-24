import React, { useContext } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { Storecontext } from "../Context/StoreContext";



const PublicRoute = ({ children }) => {
  const { token } = useContext(Storecontext);
  const location = useLocation();


 


  if (token) {
    return <Navigate to={'/'}  />;
  }


  return children;
};

export default PublicRoute;