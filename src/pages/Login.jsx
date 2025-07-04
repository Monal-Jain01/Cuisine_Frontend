import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import chefClaudeIcon from '../assets/chef_claude_icon.png';
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from "axios"
import {toast} from 'react-toastify'
import { ThemeContext } from '../context/ThemeContextProvider';

const Login = () => {

  const navigate = useNavigate()

  const {backendUrl, setIsLoggedIn, getUserData} = useContext(AppContent)

  const [state, setState] = useState("Sign Up")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const {theme} = useContext(ThemeContext)

axios.defaults.withCredentials = true; // Ensure cookies are sent with requests
  const onSubmitHandler = async (e) => {
    try{
      e.preventDefault()

      if(state === "Sign Up"){
        const {data} = await axios.post(backendUrl + "/api/auth/register", {name, email, password})

        if(data.success){
          setIsLoggedIn(true)
          getUserData()
          navigate("/")
        }else{
          toast.error(data.message)
        }
      }
      else{
        const {data} = await axios.post(backendUrl + "/api/auth/login", {email, password}, {
          headers: {
            "Content-Type": "application/json",
            "Allow-Control-Allow-Origin": "*"

          }
        })
        if (data) {
          console.log(data)
        } else {
          console.error("No data received from the server")
        }
        console.log(email, password)
        if(data.success){
        
          setIsLoggedIn(true)
          getUserData()
          navigate("/")
        }else{
          toast.error(data.message)
        }
      }

    }catch(error){
      toast.error(error.message)
    }
  }

  return (
    <div className={`flex items-center justify-center min-h-screen px-6 sm:px-0 ${theme}`}>
        <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-blue-300 text-sm'>
          <h2 className='text-3xl font-semibold text-white text-center mb-3'>
            {state === "Sign Up" ? "Create account" : "Login"}
          </h2>
          <p className='text-center text-sm mb-6'>
            {state === "Sign Up" ? "Create your account" : "Login to your account!"}
          </p>

          <form onSubmit={onSubmitHandler}>

            {state === "Sign Up" && (
              <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
              <img src={assets.person_icon} alt="" />
              <input
              value={name}
              onChange={e =>setName(e.target.value)}
               className='bg-transparent outline-none' type="text" placeholder='Full Name' required />
              </div>
            )}

            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
              <img src={assets.mail_icon} alt="" />
              <input 
              value={email}
              onChange={e =>setEmail(e.target.value)} 
              className='bg-transparent outline-none' 
              type="email" 
              placeholder='Email Id' required />
            </div>

            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
              <img src={assets.lock_icon} alt="" />
              <input 
              value={password}
              onChange={e =>setPassword(e.target.value)}
              
              className='bg-transparent outline-none' type="password" placeholder='Password' required />
            </div>

            <p onClick={() => navigate("/reset-password")} className='mb-4 text-blue-500 cursor-pointer'>Forgot Password?</p>

            <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-900 font-medium text-white'>{state} </button>
          </form>

          {state === "Sign Up" ? (
            <p className='text-gray-400 text-center text-xs mt-4'>Already have an account?{" "}
            <span onClick={() => setState("Login")} className='text-blue-400 cursor-pointer underline'>Login here</span>
          </p>) : (
            <p className='text-gray-400 text-center text-xs mt-4'>Don't have an account?{" "}
              <span onClick={() => setState("Sign Up")} className='text-blue-400 cursor-pointer underline'>Sign Up</span>
            </p>
          )
          }

          

          

        </div>
    </div>
  )
}

export default Login
