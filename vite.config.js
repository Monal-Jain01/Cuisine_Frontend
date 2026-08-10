import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// Check if running on Vercel or custom environment variable
const isVercel = process.env.VERCEL === '1' || process.env.DEPLOY_TARGET === 'vercel'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  // Use '/' for Vercel, and '/Cuisine_Frontend/' for GitHub Pages
  base: isVercel ? '/' : '/Cuisine_Frontend/',
  build: {
    chunkSizeWarningLimit: 1600,
  },
})
