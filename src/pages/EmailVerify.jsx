import React, { use } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import { useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function EmailVerify() {

  const navigate = useNavigate()
  const {backendUrl, isLoggedIn ,userData, getUserData} = useContext(AppContent)

  const inputRefs = React.useRef([])

  //move focus to next input on input
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && e.target.value.length === 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData('text').split('')
    if (pastedData.length === 6) {
      pastedData.forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = char
        }
      })
    }
  }

  const onSubmitHandler = async(e) => {
    try{
      e.preventDefault()
      const otp = inputRefs.current.map(e => e.value).join('')
      const {data} = await axios.post(`${backendUrl}/api/auth/verify-account`, {otp}, {
        withCredentials: true, // Ensure cookies are sent with requests
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData?.token || ""}`, // Use token from userData or fallback to an empty string
        },
      });
      if(data.success){
        toast.success(data.message)
        getUserData()
        navigate("/")
    }else{
      toast.error(data.message)
    }
  }catch(error){
    toast.error(error.message)
  }
}

//redirect to Home page if verified user visits email-verify page
useEffect(() => {
  isLoggedIn && userData && userData.isAccountVerified && navigate("/")
}, [isLoggedIn, userData])

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={() => navigate("/")} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />
      
      <form 
      onSubmit={onSubmitHandler}
      className='bg-slate-900 p-8 rounded-ig shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code sent to your email id.</p>
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              required
              ref={e => inputRefs.current[index] = e}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className='w-12 h-12 text-center text-xl bg-[#333a5c] rounded-md text-white'
            />
          ))}
        </div>
        <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Submit</button>

      </form>
      
      
    </div>
  )
}

export default EmailVerify
