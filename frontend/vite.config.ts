import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  define: {
    global: "window", // Fix for 'global is not defined'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      
    },
  },
})
