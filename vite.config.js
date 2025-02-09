import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base:'/flappyBird-react-app/',
  build: {
    outDir: 'dist', // Ensure the build outputs to the `dist` folder
  },
})