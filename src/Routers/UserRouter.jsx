import React, { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import Navbar from '../components/user/Navbar/Navbar';
import Home from '../Pages/User/Home/Home';
import Footer from '../components/user/Footer/Footer';
import Login from '../Pages/User/Login/Login';
import Register from '../Pages/User/Register/Register';
const UserRouter = () => {
  const [showLogin,setshowlogin]=useState(false)
  
  return (
    <>
   
    <div className='app'>
    <Navbar setshowlogin={setshowlogin} />
      <Routes>
        <Route path='/login' element={ <Login setshowlogin={setshowlogin} />}/>
        <Route path='/register' element={<Register />}     />      
        <Route path='/' element={<Home />} />
      </Routes>
     <Footer />
    </div>
    </>
  )
}

export default UserRouter
