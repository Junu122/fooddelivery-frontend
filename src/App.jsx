import { useState } from 'react'
import Navbar from './components/user/Navbar/Navbar'
import { Route, Routes } from "react-router-dom";
import './App.css'
import UserRouter from './Routers/UserRouter';

function App() {
 

  return (
    <>
   
     <Routes>
      <Route path='/*' element={<UserRouter />} />
     </Routes>

    </>
  )
}

export default App
