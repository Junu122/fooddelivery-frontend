import React,{useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { Storecontext } from '../../Context/StoreContext';

const PrivateRoute = ({ children }) => {
 
  const token=localStorage.getItem('adminToken')

  
 
  if(!token){
     return <Navigate to="/admin/login"  replace />
  }
  return children
};

export default PrivateRoute;