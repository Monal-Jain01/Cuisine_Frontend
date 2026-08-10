import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext.jsx'
import { SavedContext } from './context/SavedContext.jsx'
import ThemeContextProvider from './context/ThemeContextProvider.jsx'

// Vite automatically sets BASE_URL to match the 'base' configured in vite.config.js
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ThemeContextProvider>
        <AppContextProvider>
          <SavedContext>
            <App />
          </SavedContext>
        </AppContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </StrictMode>
)
