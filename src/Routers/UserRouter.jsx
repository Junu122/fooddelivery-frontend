import React from 'react'
import { Route, Routes } from "react-router-dom";
import Navbar from '../components/user/Navbar/Navbar';
import Home from '../Pages/User/Home/Home';
import Footer from '../components/user/Footer/Footer';
const UserRouter = () => {
  return (
    <div className='app'>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
     <Footer />
    </div>
  )
}

export default UserRouter
