import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';
import { assets } from '../../../assets/assets';
import { adminService } from '../../../services/adminServices';
import { Storecontext } from '../../../Context/StoreContext';
const  AdminLogin=()=> {
  const {setadminToken}=useContext(Storecontext)
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const navigate=useNavigate()
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
    
      await new Promise(resolve => setTimeout(resolve, 1000));
      
     const response=await adminService.adminLogin(credentials)
     console.log(response)
     if(response?.data?.success){
      localStorage.setItem('adminToken',response?.data?.token)
      setadminToken(response?.data?.token)
      navigate('/admin')
     }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="logo-container">
           
            <img 
              src={assets.logo} 
              alt="Tomato Logo" 
              className="tomato-logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/100?text=Tomato';
              }}
            />
          </div>
          <h1>Tomato Admin</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          
          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;