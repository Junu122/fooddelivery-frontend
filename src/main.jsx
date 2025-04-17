import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Storecontextprovider from './Context/StoreContext.jsx'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Storecontextprovider>
  <ToastContainer />
  <StrictMode>
    <App />
  </StrictMode>
  </Storecontextprovider>
  </BrowserRouter>,
)
