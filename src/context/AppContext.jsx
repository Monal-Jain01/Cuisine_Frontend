import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null); // Default to null for clarity

    const navigate = useNavigate()

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

    const getAuthState = async () => {
        try {
            const {data} = await axios.post(`${backendUrl}/api/auth/is-auth`, {}, {
                withCredentials: true, // Ensure cookies are sent with requests
            });
            if (data.success) {
                setIsLoggedIn(true); // User is authenticated
                getUserData(); // Fetch user data if authenticated
                console.log("User is authenticated"); // Debugging
            } else {
                setIsLoggedIn(false); // User is not authenticated
                console.log("User is not authenticated"); // Debugging
            }
        } catch (error) {
            console.log(error.message); // Debugging
        }
    }

    const getUserData = async () => {
        console.log("user: ",userData)
        console.log("appContent getUserData call ho raha hai"); // Debugging
        try {
            console.log("Fetching user data..."); // Debugging
        const { data } = await axios.get(`${backendUrl}/api/user/data`, {
            withCredentials: true, // Ensure cookies are sent with requests
        });
            if (data.success) {
                setUserData(data.userData);
                console.log("User data fetched:", data.userData); // Debugging
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching user data:", error.message); // Debugging
            console.log("Failed to fetch user data. Please try again.");
        }
    };

    useEffect(() => {
        getAuthState(); // Check authentication state on component mount
        getUserData()
    }, []);

    const value = {
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
        logout,
    };

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    );
};