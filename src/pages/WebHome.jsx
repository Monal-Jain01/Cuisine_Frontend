import React from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import { useContext } from 'react'
import { toast } from 'react-toastify'

export default function WebHome() {
    const {userData} = useContext(AppContent)
  
  const navigate = useNavigate()
  return (
    <div className='bg-gray-100' >
        {userData && <div className=' px-8 pt-60'>
          <h1  className='text-xl sm:text-3xl font-medium mb-2 '>Hey {userData.name} !</h1>
        </div>
        }
        <div className='p-4 flex flex-col items-center justify-center h-screen bg-gray-100'>
            <h1 className='text-4xl font-bold '>Welcome to Cuisine Catalyst</h1>
            <p className='p-4 pt-0 justify-items-center text-lg text-gray-700 mb-8'>Your go-to destination for effortless, personalized cooking inspiration! </p>
            <p className='p-4 justify-items-center text-xl text-gray-700 mb-8'>We’re here to transform your ingredients into delicious meals, no matter your skill level, dietary needs, or pantry size. Join our community of food lovers and discover the joy of cooking made simple, sustainable, and uniquely yours. Ready to whip up something amazing? Start exploring now!</p>
            <button onClick={() => { !userData ? toast.error('Please login to continue.') : navigate('/content')}} className='rounded-full bg-gradient-to-r from-blue-500 to-blue-900 text-white px-6 py-2  hover:bg-blue-600 cursor-pointer'>Get Started</button>
        </div>
        <div className='flex justify-between items-center bg-gray-800 p-4 text-white'>
            Cuisine Catalyst @2025
        </div>
      
    </div>
  )
}
