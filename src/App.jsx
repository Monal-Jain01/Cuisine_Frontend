import React, { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import EmailVerify from './pages/EmailVerify'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import WebHome from './pages/WebHome'
import Content from './pages/Content'
import SavedList from './pages/SavedList'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { ThemeContext } from './context/ThemeContextProvider'
import Account from './pages/Account'
import { AppContent } from './context/AppContext'
import Rate_CC from './pages/Rate_CC'

function App() {

  const {theme} = useContext(ThemeContext)
  const {userData} = useContext(AppContent)
  

  return (
    <>
    <div className='flex '>
      { userData &&
      <Sidebar/>
    }
      <div className='flex w-full flex-col text-[#fff] bg-[url("./assets/bg_food4.png")] bg-no-repeat bg-cover bg-center h-fit'>
      
      <Navbar />
      <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<WebHome />} />
        <Route path="/content" element={<Content />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Account />} />
        <Route path="/rate-cc" element={<Rate_CC />} />
        <Route path="/saved-recipes" element={<SavedList />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email-verify" element={<EmailVerify />} />
      </Routes>
      </div>
      </div>
      </div>
      
    
      
      
    </>
  )
}

export default App

