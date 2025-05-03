import { useState } from 'react'

import { Route, Routes } from "react-router-dom";
import UserRouter from './Routers/User/UserRouter';
import AdminRouter from './Routers/Admin/AdminRouter';
function App() {
 

  return (
    <>
   
     <Routes>
      <Route path='/*' element={<UserRouter />} />
      <Route path='/admin/*' element={<AdminRouter />} />
     </Routes>

    </>
  )
}

export default App
