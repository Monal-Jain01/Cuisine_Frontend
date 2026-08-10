import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext.jsx'
import { SavedContext } from './context/SavedContext.jsx'
import ThemeContextProvider from './context/ThemeContextProvider.jsx'

// Determine the router basename at runtime from a Vite env var so the app
// can work on both GitHub Pages (e.g. "/Cuisine_Frontend/") and Vercel ("/").
// Set VITE_BASENAME to "/" for Vercel builds (in Vercel project env vars),
// or leave it unset to default to the GitHub Pages path.
const basename = import.meta.env.VITE_BASENAME || '/Cuisine_Frontend'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
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
