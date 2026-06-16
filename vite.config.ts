import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// User-pages site (mridul-sahu.github.io) serves at the domain root.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
