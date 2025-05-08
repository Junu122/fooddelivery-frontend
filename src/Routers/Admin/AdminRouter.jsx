import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../../Pages/Admin/Dashobard/Dashboard";
import Users from "../../Pages/Admin/Users/Users";
import FoodTab from "../../Pages/Admin/FoodTab/FoodTab";
import Orders from "../../Pages/Admin/Orders/Orders";
import AdminLogin from "../../Pages/Admin/Login/AdminLogin";
import PrivateRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
const AdminRouter = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/foods"
          element={
            <PrivateRoute>
              <FoodTab />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AdminRouter;
