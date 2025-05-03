import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Storecontext } from "../../Context/StoreContext";

function ProtectedRoute({ children }) {
 const {settoken}=useContext(Storecontext)
  const  token  = localStorage.getItem('userToken')
  const location = useLocation();

  if (!token) {
    settoken("")
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export default ProtectedRoute;