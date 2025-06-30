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
    <div className=''  >
        {userData ? <div className=' px-6 pt-20'>
          <h1  className='text-xl sm:text-3xl font-medium '>Hey {userData.name} !</h1>
        </div>: <div className='pt-60'></div>
        }
        <div className='p-4 flex flex-col items-center'>
            <h1 className='md:text-5xl text-4xl text-gradient-to-r from-[#020206] via-[#0b091e]/50 to-red-950   font-bold pt-8 '>Welcome to Cuisine Catalyst</h1>
            <p className='py-4 px-2 pt-0 justify-items-center md:text-xl text-gray-400 mb-8'>Your go-to destination for effortless, personalized cooking inspiration! </p>
            <p className='p-4 justify-items-center text-2xl text-gray-200'>We’re here to transform your ingredients into delicious meals, no matter your skill level, dietary needs, or pantry size. Join our community of food lovers and discover the joy of cooking made simple, sustainable, and uniquely yours. Ready to whip up something amazing? <br/>Start exploring now!</p>
            <button onClick={() => { !userData ? toast.error('Please login to continue.') : navigate('/content')}} className='rounded-full bg-gradient-to-r from-[#020206] via-[#0b091e]/50 to-red-950 text-2xl shadow-lg shadow-black text-white px-16 py-6 mt-16 cursor-pointer hover:scale-105 hover:bg-[#0b091e] cursor-pointer font-semibold'>Get Started</button>
        </div>
        <div className='flex justify-between items-center  p-4 mt-32 text-white'>
            Cuisine Catalyst @2025
        </div>
      
    </div>
  )
}
