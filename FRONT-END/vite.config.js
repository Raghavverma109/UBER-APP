import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()],
    server: {
    // wired-Connection 
    // host: '0.0.0.0',       // 🟢 Allow access from LAN (your phone)
    // port: 5173,            // You can change this if needed
    // strictPort: true,      // Fail if port is in use

    // wireless-Connection 
    host: true, // Enables LAN access (your phone can now connect wirelessly)
    port: 5173, 
  }
})
