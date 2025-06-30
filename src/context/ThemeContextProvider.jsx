import React, {useEffect, useState, createContext} from 'react'

export const ThemeContext = createContext();

const getTheme = () => {
  const theme = localStorage.getItem('theme');
  if (!theme) {
    localStorage.setItem("theme", "dark");
    return "dark" ; // default theme
  } else {
    return theme; 
  }
}


export default function ThemeContextProvider({children}) {
  const [theme, setTheme] = useState(getTheme);

   const toggleTheme = () => {
    if(theme === "dark"){
      setTheme("light")
    } else{
      setTheme("dark")
    }
   }
   useEffect(() => {
    const refreshTheme = () => {
      localStorage.setItem("theme", theme);
    }

    refreshTheme();
   }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme
      }}>
      {children}
    </ThemeContext.Provider>
  )
}
