import React from 'react'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import { useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import chefClaudeIcon from '../assets/chef_claude_icon.png';
import fav_icon from '../assets/fav_icon.jpg'


const Navbar = () => {

  const navigate = useNavigate()
  const {userData, backendUrl, setUserData, setIsLoggedIn} = useContext(AppContent)

  const logout = async () => {
    try {
      const {data} = await axios.post(`${backendUrl}/api/auth/logout`, {
        withCredentials: true, // Ensure cookies are sent with requests
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData?.token || ""}`, // Use token from userData or fallback to an empty string
        },
      });
      if (data.success) {
        setUserData(null); // Clear user data on logout
        setIsLoggedIn(false); // Update authentication state
        navigate('/'); // Redirect to home page
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const sendVerificationOtp = async () => {
    try{
      axios.defaults.withCredentials = true; // Ensure cookies are sent with requests
      const {data} = await axios.post(`${backendUrl}/api/auth/send-verify-otp`)
      if(data.success){
        navigate("/email-verify")
        toast.success(data.message)
    }else{
      toast.error(data.message)
    }
  }catch(error){
    toast.error(error.message)
  }
}

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 bg-gray-800 text-white'>
              <img onClick={() => navigate("/")} src={chefClaudeIcon} alt="" className=' sm:w-16 w-12 cursor-pointer' />


      <h1 className='text-2xl font-bold'>Cuisine Catalyst</h1>
      {userData?
        <div className='flex items-center gap-4'>
          <button onClick={() => navigate('/saved-recipes')} className='py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-900 rounded-full' > <img src={fav_icon} alt="" />  Yum Picks </button>
      <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
        {userData.name[0].toUpperCase()}
        <div className='hidden absolute group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
          <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
            {!userData.isAccountVerified && <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify email</li>}
            <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
          </ul>
        </div>
      </div> </div> : <button 
      onClick={() => navigate('/login')}
      className='flex items-center gap-2 border border-gray-500 rounded-full bg-gradient-to-r from-blue-500 to-blue-900 px-6 py-2  hover:bg-gray-100 transition-all text-white'>Sign in / Sign up
        <img src={assets.arrow_icon} alt="" />
      </button>
      
    }
      

    </div>
  )
}

export default Navbar
