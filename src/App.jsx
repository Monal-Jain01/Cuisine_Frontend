import React from 'react'
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

function App() {
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<WebHome />} />
        <Route path="/content" element={<Content />} />
        <Route path="/login" element={<Login />} />
        <Route path="/saved-recipes" element={<SavedList />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email-verify" element={<EmailVerify />} />
      </Routes>
      
    </div>
  )
}

export default App
