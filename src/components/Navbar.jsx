import React from 'react'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import { useContext } from 'react'
import chefClaudeIcon from '../assets/chef_claude_icon.png';
import AssistantIcon from '@mui/icons-material/Assistant';
const Navbar = () => {

  const navigate = useNavigate()
  const {userData, backendUrl, logout, setUserData, setIsLoggedIn} = useContext(AppContent)

  

  return (
    <div className=' w-full h-24 flex justify-between items-center p-4 sm:p-6 sm:px-24  bg-black/60 backdrop-blur-sm text-white shadow-md shadow-black '>
      <img onClick={() => navigate("/")} src={chefClaudeIcon} alt="" className=' sm:w-18 w-12 cursor-pointer' />
      <h1 className='text-3xl font-bold'>Cuisine Catalyst</h1>
      {userData ?
        <div className='flex items-center gap-4'>
          <button onClick={() => navigate('/saved-recipes')} className='hidden md:block py-2 px-4 cursor-pointer hover:bg-gray-700  bg-blue-900/40 backdrop-blur-2xl shadow-md shadow-black rounded-xl text-2xl mr-4' > <AssistantIcon className='mr-2' fontSize='in' /> Yum Picks  </button>
      <div className='w-12 h-12 flex justify-center items-center rounded-full bg-blue-900/40 backdrop-blur-2xl shadow-md shadow-black text-white text-xl relative group'>
        {userData.name[0].toUpperCase()}
        <div className='hidden absolute group-hover:block top-0 right-0  text-black rounded pt-10'>
          <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
            
            <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
          </ul>
        </div>
      </div> </div> : <button 
      onClick={() => navigate('/login')}
      className='flex items-center gap-2 py-2 px-4 cursor-pointer hover:bg-gray-700  bg-blue-900/60 backdrop-blur-2xl shadow-md shadow-black rounded-xl md:text-2xl md:mr-4'>Sign in / Sign up
        <img src={assets.arrow_icon} alt="" />
      </button>
      
    }
      

    </div>
  )
}

export default Navbar
