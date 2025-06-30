import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './app.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext.jsx'
import { SavedContext } from './context/SavedContext.jsx'
import ThemeContextProvider from './context/ThemeContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/Cuisine_Frontend'>
  <ThemeContextProvider>
  <AppContextProvider>
    <SavedContext>
      <App />
    </ SavedContext>
  </AppContextProvider>
  </ThemeContextProvider>
  </BrowserRouter>
)
