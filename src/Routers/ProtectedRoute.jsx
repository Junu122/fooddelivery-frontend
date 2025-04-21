import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Storecontext } from "../Context/StoreContext";

function ProtectedRoute({ children }) {
  const { token } = useContext(Storecontext);
  const location = useLocation();

  if (!token) {
    // Redirect to login while saving the current location
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export default ProtectedRoute;