import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContextProvider';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { motion, AnimatePresence } from 'framer-motion';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import AssistantIcon from '@mui/icons-material/Assistant';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import toggle_light from '../assets/night.png'
import toggle_dark from '../assets/day.png'
import { AppContent } from '../context/AppContext';

const routes = [
  {
    path: "/",
    name: "Home",
    icon: <HomeIcon />,
  },
  {
    path: "/profile",
    name: "Profile",
    icon: <AccountCircleIcon />,
  },
  {
    path: "/content",
    name: "Get Recipe",
    icon: <FoodBankIcon />,
  },
  {
    path: "/saved-recipes",
    name: "Saved Recipe",
    icon: <AssistantIcon />,
  },
  {
    path: "/rate-cc",
    name: "Rate Cuisine Catalyst",
    icon: <ThumbUpOffAltIcon />,
  },
  
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const { theme, toggleTheme } = useContext(ThemeContext);
  const {logout} = useContext(AppContent)

  return (
    <div className={`flex absolute ${isOpen ? " bg-black/70 backdrop-blur-xl shadow-md shadow-black border-0": "border-0"} rounded-b-3xl  z-100 md:pt-8 md:pl-4 text-white `}>
      <motion.div
        animate={{
          width: isOpen ? "220px" : "0px",
          transition: {
            duration: 0.5,
            type: "spring",
            damping: 10,
          },
        }}
        >
        <div
          className={`flex justify-between items-center font-bold px-1 py-0.5 `}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.h1
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                
              </motion.h1>
            )}
          </AnimatePresence>
          <div className="w-8 cursor-pointer">
            <MenuIcon onClick={toggle} fontSize='large' />
          </div>
        </div>
        {isOpen && <section className="flex  z-100 text-white flex-col mt-4 gap-1">
          {routes.map((route, index) => (
            <NavLink
              to={route.path}
              key={index}
              className='flex  p-4 items-center  gap-2 px-1 py-2 border-r border-r-transparent link'
            >
              <div className="p-3">{route.icon}</div>
              <AnimatePresence>
                
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className=" whitespace-nowrap"
                  >
                    {route.name}
                    <hr/>
                  </motion.div>
                
              </AnimatePresence>
            </NavLink>
          ))}
          <div
              onClick={toggleTheme}
              className={` flex gap-2 px-1 py-2 items-center p-4 border-r cursor-pointer border-r-transparent link`}
            >
              <img
                onClick={toggleTheme}
                src={theme === 'dark' ? toggle_dark : toggle_light}
                alt=""
                className="w-7 h-7 m-2 mr-3"
                />
              <AnimatePresence>
                
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className=" whitespace-nowrap"
                  >
                    Theme
                    <hr />
                  </motion.div>
                
              </AnimatePresence>
            </div>
            <div
              onClick={logout}
              className={`flex gap-5 my-3 px-1 py-2 items-center p-4 border-r cursor-pointer border-r-transparent link ml-3`}
            >
              <LogoutIcon />
              <AnimatePresence>
                
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className=" whitespace-nowrap"
                  >
                    Logout
                    <hr />
                  </motion.div>
                
              </AnimatePresence>
            </div>
           
        </section>}
      </motion.div>
    </div>
  );
}


