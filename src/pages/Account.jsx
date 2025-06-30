import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from '../context/ThemeContextProvider';
import { AppContent } from "../context/AppContext";
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Account() {
 const navigate = useNavigate()

  const {backendUrl, setIsLoggedIn, getUserData, userData} = useContext(AppContent)


  const [password, setPassword] = useState("");
  const [curr_password, curr_setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [error, setError] = useState(false);

  const { theme } = useContext(ThemeContext);


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
    <>
    <div className= {`h-screen min-h-fit ${theme}`}>
      <div className=" p-4">
        <div className="p-4 text-center">
          <h1 className='md:text-4xl text-3xl font-bold '>Account Settings</h1>
          <h5 className="mb-4 font-[200]">
            Manage your account details and security
          </h5>
        </div>

        <div className='flex flex-col gap-20 md:ml-40 mt-20'>
          <div className="flex flex-col ml-4">
            <label className="text-2xl">Email address</label>
            <div className=" h-fit  font-[200] border-b  md:w-80 min-w-fit rounded">{userData.email}
              
              {!userData.isAccountVerified && <button onClick={sendVerificationOtp} className='py-2 px-4 ml-2 md:ml-40 md:p-3 rounded-lg bg-gray-700 text-white hover:bg-gray-500 cursor-pointer '>Verify
                <div className="hidden text-black bg-red-700 z-100 absolute group-hover:block top-0 right-0 "> Send OTP</div>
                </button>}
            </div>
          </div>

          <div className="flex flex-col ml-4 ">
            <label className="text-2xl mb-4">Username</label>
            <div className=" h-4  font-[200] border-b pb-8 rounded md:w-80">{userData.name}</div>
          </div>

          <label onClick={() => navigate('/reset-password')} className="ml-4 cursor-pointer hover:text-gray-500 text-2xl">Reset Password</label>
        </div>
      </div>
    </div> 
             </>
  );
}
