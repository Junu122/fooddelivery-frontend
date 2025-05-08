import React, { useContext } from "react";
import "../../../Pages/Admin/AdminPanel/AdminPanel.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlignJustify, X } from "lucide-react";
import { Storecontext } from "../../../Context/StoreContext";
const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const { setadminToken } = useContext(Storecontext);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlelogout = () => {
    localStorage.removeItem("adminToken");
    if (setadminToken) {
      setadminToken("");
    }
    navigate("/admin/login");
  };

  return (
    <div className="app-container">
      <div className="mobile-menu-button">
        <AlignJustify onClick={toggleSidebar} className="hamburger-icon" />
      </div>
      <div className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <h2>Admin Dashboard</h2>
          <button className="close-sidebar" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <NavLink to={"/admin"} end>
            🏠 Dashboard
          </NavLink>
          <NavLink to={"/admin/users"}>👥 Users</NavLink>
          <NavLink to={"/admin/foods"}>🍔 Food Items</NavLink>

          <NavLink to={"/admin/orders"}>🛒 Orders</NavLink>
          <div to={"#"} onClick={handlelogout} className="logout-NavLink">
            🚪 Logout
          </div>
        </nav>
      </div>

      <div className="main-content">
        <header className="main-header">
          <h1>Food Delivery Admin</h1>
        </header>
        <main className="content-area">{children}</main>
      </div>

      
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

export default AdminLayout;
